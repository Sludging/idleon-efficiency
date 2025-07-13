import { Box, Button, Grid, Layer, Text, TextInput } from "grommet";
import { useState } from "react";
import IconImage from "../../base/IconImage";
import { nFormatter } from "../../../data/utility";
import { EfficiencyDomain } from "../../../lib/efficiencyEngine/efficiencyEngine";

// Resource Weight Modal Component
function ResourceWeightModal<T extends EfficiencyDomain>({ 
    isOpen, 
    onClose, 
    onRecalculate,
    currentWeights,
    domain,
}: { 
    isOpen: boolean; 
    onClose: () => void; 
    onRecalculate: (weights: Record<number, number>) => void; 
    currentWeights: Record<number, number>;
    domain: T;
}) {
    const [weights, setWeights] = useState<Record<number, number>>(currentWeights);
    const [inputValues, setInputValues] = useState<Record<number, string>>(() => {
        // Initialize input values from current weights
        const initial: Record<number, string> = {};
        Object.entries(currentWeights).forEach(([id, weight]) => {
            initial[Number(id)] = weight.toString();
        });
        return initial;
    });

    const [errors, setErrors] = useState<Record<number, string>>({});

    const resourceTypes = Object.entries(domain.getResourceTypes()).map(([name, id]) => ({
        id: id,
        name: name,
        color: "accent-1",
    }));

    const resourceName = domain.getResourceGeneralName();

    const parseResourceRate = (input: string): { value: number; error?: string } => {
        if (!input || input.trim() === '') return { value: 0 };
        
        const cleanInput = input.trim().toLowerCase();
        
        if (cleanInput === '0') return { value: 0 };
        
        // Define supported suffixes and their multipliers
        const suffixMap: Record<string, number> = {
            'k': 1000,
            'm': 1000000,
            'b': 1000000000,
            't': 1000000000000
        };
        
        // Check if input ends with a supported suffix
        for (const [suffix, multiplier] of Object.entries(suffixMap)) {
            if (cleanInput.endsWith(suffix)) {
                const numberPart = cleanInput.slice(0, -1);
                const parsed = parseFloat(numberPart);
                
                // Check if the entire number part is valid (no extra characters)
                if (!isNaN(parsed) && isFinite(parsed) && numberPart === parsed.toString()) {
                    return { value: parsed * multiplier };
                } else {
                    return { 
                        value: 0, 
                        error: `Invalid number before "${suffix.toUpperCase()}"` 
                    };
                }
            }
        }
        
        // If no suffix, try parsing as a plain number
        const parsed = parseFloat(cleanInput);
        
        // Check if the entire input is a valid number (no extra characters)
        if (!isNaN(parsed) && isFinite(parsed) && cleanInput === parsed.toString()) {
            return { value: parsed };
        }
        
        // If we get here, the input couldn't be parsed
        return { 
            value: 0, 
            error: "Invalid format. Use numbers like: 100, 1.5, 10K, 100M" 
        };
    };

    const handleInputChange = (boneTypeId: number, value: string) => {       
        // Always update the input value to reflect what user typed
        setInputValues({
            ...inputValues,
            [boneTypeId]: value
        });
        
        // Validate the input in real-time
        const result = parseResourceRate(value);
        
        if (result.error) {
            setErrors({
                ...errors,
                [boneTypeId]: result.error
            });
            // Don't update weights when there's an error
        } else {
            // Clear error if input is now valid
            if (errors[boneTypeId]) {
                const newErrors = { ...errors };
                delete newErrors[boneTypeId];
                setErrors(newErrors);
            }
            
            // Only update weights when there's no error
            setWeights({
                ...weights,
                [boneTypeId]: result.value
            });
        }
    };

    const handleRecalculate = () => {       
        if (Object.keys(errors).length > 0) {
            return;
        }

        onRecalculate(weights);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <Layer onEsc={onClose} onClickOutside={onClose}>
            <Box pad="large" gap="medium" width="medium">
                <Text size="large" weight="bold">Configure Resource Weights</Text>
                <Text size="small" color="dark-4">
                    Set your {resourceName} gathering rates to help prioritize upgrades that cost resources you can farm more easily.
                    Higher rates make resources "cheaper" in efficiency calculations.
                </Text>
                
                <Box gap="small">
                    <Text size="small" weight="bold">{resourceName.toLocaleUpperCase()} Rates (per hour)</Text>
                    <Text size="xsmall" color="dark-4">
                        Enter your farming rates in formats like: 100M, 10K, 1.5, or 0
                    </Text>
                    
                    <Grid columns={['1fr', '1fr']} gap="small">
                        {resourceTypes.map(resourceType => (
                            <Box key={resourceType.id} gap="xsmall">
                                <Box direction="row" gap="small" align="center">
                                    <IconImage data={domain.getResourceImageData(resourceType.id)} scale={0.8} />
                                    <Text size="small" weight="bold">{resourceType.name}</Text>
                                </Box>
                                <TextInput
                                    size="small"
                                    value={inputValues[resourceType.id] || ""}
                                    onChange={(event) => handleInputChange(resourceType.id, event.target.value)}
                                    placeholder="1.0"
                                />
                                <Text size="xsmall" color="dark-4">
                                    Current weight: {nFormatter(currentWeights[resourceType.id] !== undefined ? currentWeights[resourceType.id] : 1.0, "Smaller")}
                                </Text>
                                {errors[resourceType.id] && (
                                    <Text size="xsmall" color="status-error">
                                        {errors[resourceType.id]}
                                    </Text>
                                )}
                            </Box>
                        ))}
                    </Grid>
                </Box>
                
                <Box direction="row" gap="small" justify="end">
                    <Button label="Cancel" onClick={onClose} />
                    <Button label="Re-calculate" primary onClick={handleRecalculate} />
                </Box>
            </Box>
        </Layer>
    );
}

export default ResourceWeightModal;
