import { Text, Box } from "grommet";
import { useMemo } from "react";
import { SourcesModel } from "../../data/domain/model/sourcesModel";

export default function ItemSourcesDisplay({ sources, titleTextSize = "small" }: { sources: SourcesModel, titleTextSize?: "medium" | "small"}) {

    const possibleSources = useMemo(() => { 
        if (!sources) {
            return []
        }

        const fromSources = sources.sources ? sources.sources.map(x => x.txtName) : [];
        const fromRecipe = sources.recipeFrom ? sources.recipeFrom.map(x => x.txtName) : [];
        const fromQuests = sources.questAss ? sources.questAss.map(x => x.txtName) : [];
        return Array.from(new Set([...fromSources, ...fromRecipe, ...fromQuests]));
    }, [sources]);


    return (
        <Box>
            <Text size={titleTextSize}>Obtain From:</Text>
            {
                possibleSources.length > 0 ? 
                <Box>
                    
                    {
                        possibleSources.map((source, index) => (
                            <Text size="xsmall" key={index}>{source}</Text>
                        ))
                    }
                </Box> :
                <>I don&apos;t know yet</>
            }
        </Box>
    )
}