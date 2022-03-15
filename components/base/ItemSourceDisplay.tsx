import { Text, Box } from "grommet";
import { useMemo } from "react";
import { ItemSources } from "../../data/domain/items";

export default function ItemSourcesDisplay({ sources }: { sources: ItemSources}) {

    const possibleSources = useMemo(() => { 
        if (!sources) {
            return []
        }

        const fromSources = sources.sources.map(x => x.txtName);
        const fromRecipe = sources.recipeFrom.map(x => x.txtName);
        const fromQuests = sources.questAss.map(x => x.txtName);
        return Array.from(new Set([...fromSources, ...fromRecipe, ...fromQuests]));
    }, [sources]);


    return (
        <Box>
            <Text size="medium">Obtain From:</Text>
            {
                possibleSources.length > 0 ? 
                <Box>
                    
                    {
                        possibleSources.map((source, index) => (
                            <Text size="small" key={index}>{source}</Text>
                        ))
                    }
                </Box> :
                <>I don&apos;t know yet</>
            }
        </Box>
    )
}