import { Box, Button, Grid, Layer, Text, TextInput } from "grommet";
import { useState } from "react";
import IconImage from "../../base/IconImage";
import { nFormatter, parseFormattedNumber, FORMATTED_NUMBER_PATTERN } from "../../../data/utility";
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

    // Remove parseResourceRate, use parseFormattedNumber instead

    const handleInputChange = (boneTypeId: number, value: string) => {       
        // Always update the input value to reflect what user typed
        setInputValues({
            ...inputValues,
            [boneTypeId]: value
        });
        
        // Validate the input in real-time using parseFormattedNumber
        const cleanInput = value.trim();
        let parsedValue = parseFormattedNumber(cleanInput.toUpperCase());
        let error: string | undefined = undefined;
        
        if (cleanInput === "") {
            parsedValue = 0;
        } else if (isNaN(parsedValue) || !isFinite(parsedValue)) {
            error = "Invalid format. Use numbers like: 100, 1.5, 10K, 100M, 1E6";
            parsedValue = 0;
        } else {
            // Check if the input matches the expected format using the shared pattern
            if (!FORMATTED_NUMBER_PATTERN.test(cleanInput.toUpperCase())) {
                error = "Invalid format. Use numbers like: 100, 1.5, 10K, 100M, 1E6";
                parsedValue = 0;
            }
        }

        if (error) {
            setErrors({
                ...errors,
                [boneTypeId]: error
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
                [boneTypeId]: parsedValue
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
                    <Button size="small" label="Cancel" onClick={onClose} />
                    <Button size="small" label="Recalculate" primary onClick={handleRecalculate} />
                </Box>
            </Box>
        </Layer>
    );
}

export default ResourceWeightModal;
