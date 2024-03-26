import {
    Box,
    Text,
    Heading,
    Grid,
    Stack,
    Select,
    SelectMultiple
} from 'grommet'
import { useEffect, useContext, useState, useMemo } from 'react';
import { AppContext } from '../../data/appContext';
import { NextSeo } from 'next-seo';
import ShadowBox from '../../components/base/ShadowBox';
import IconImage, { AdaptativeIconImage } from '../../components/base/IconImage';
import { Card } from '../../data/domain/cards';
import { CardSet } from '../../data/domain/cardSets';
import TipDisplay from '../../components/base/TipDisplay';
import { initCardSetRepo } from '../../data/domain/data/CardSetRepo';
import { uniqueFilter } from '../../data/utility';

const shouldHideCard = ({ card }: { card: Card }) => {
    return false;
}

const CardBox = ({ card }: { card: Card }) => {
    const currentCardLevel = card.getStars();
    const cardsToNextLevel = card.count > 0 ? (card.getCardsForStar(currentCardLevel + 1) - card.count) : 1;
    const isMaxed: boolean = (card.fivestar ? currentCardLevel == 5 : currentCardLevel == 4);

    // Keeping this for next world release or any other reason there might be to hide a card
    if (shouldHideCard({ card })) {
        return (
            <ShadowBox background='dark-1' style={{ opacity: card.count > 0 ? 1 : 0.5 }} gap='small' pad='medium' align='left'>
                Hidden
            </ShadowBox>
        )
    }

    return (
        <ShadowBox background='dark-1' style={{ opacity: card.count > 0 ? 1 : 0.5 }} gap='small' pad='medium' align='left'>
            <TipDisplay
                heading={card.displayName + " Card"}
                body={
                    <Box margin={{ bottom: 'xsmall' }} width='auto' direction='column' gap='small'>
                        <Box width='100%' gap='none' align='start'>
                            <Text size="small">Cards collected : {card.count}</Text>
                            <Text size="small">Base drop rate : {card.getBaseDropRateText()}</Text>
                        </Box>
                        <Box direction='column'>
                            <Box direction='row' justify='start' align='center' gap='xxsmall'>
                                <IconImage data={Card.getStarImageForLevel(0)} />
                                <Text size="small"> : {card.getBonusText(0)} ({Math.floor(card.getCardsForStar(0))} cards)</Text>
                            </Box>
                            <Box direction='row' justify='start' align='center' gap='xxsmall'>
                                <IconImage data={Card.getStarImageForLevel(1)} />
                                <Text size="small"> : {card.getBonusText(1)} ({Math.floor(card.getCardsForStar(1))} cards)</Text>
                            </Box>
                            <Box direction='row' justify='start' align='center' gap='xxsmall'>
                                <IconImage data={Card.getStarImageForLevel(2)} />
                                <Text size="small"> : {card.getBonusText(2)} ({Math.floor(card.getCardsForStar(2))} cards)</Text>
                            </Box>
                            <Box direction='row' justify='start' align='center' gap='xxsmall'>
                                <IconImage data={Card.getStarImageForLevel(3)} />
                                <Text size="small"> : {card.getBonusText(3)} ({Math.floor(card.getCardsForStar(3))} cards)</Text>
                            </Box>
                            <Box direction='row' justify='start' align='center' gap='xxsmall'>
                                <IconImage data={Card.getStarImageForLevel(4)} />
                                <Text size="small"> : {card.getBonusText(4)} ({Math.floor(card.getCardsForStar(4))} cards)</Text>
                            </Box>
                            {
                                card.fivestar &&
                                <Box direction='row' justify='start' align='center' gap='xxsmall'>
                                    <IconImage data={Card.getStarImageForLevel(5)} />
                                    <Text size="small"> : {card.getBonusText(5)} ({Math.floor(card.getCardsForStar(5))} cards)</Text>
                                </Box>
                            }
                        </Box>
                        {(!isMaxed) &&
                            <Box>
                                <Text size="small">Next card level in {Math.floor(cardsToNextLevel)} cards</Text>
                                {cardsToNextLevel != Math.floor(cardsToNextLevel) && <Text size="small">/!\ In-game will say {Math.ceil(cardsToNextLevel)} but it's technically {Math.floor(cardsToNextLevel)} due to rounding shenanigans</Text>}
                            </Box>
                        }
                    </Box>
                }
            >
                <Box direction='row' gap='small' align='left'>
                    <Box direction='column' gap='small' align='center'>
                        <Stack>
                            <Box>
                                <IconImage data={card.getImageData()} />
                            </Box>
                            <Box>
                                <IconImage data={card.getBorderImageData()} />
                            </Box>
                        </Stack>
                    </Box>
                    <Box direction='column' gap='none' align='left'>
                        <Text size='medium'>{card.displayName}</Text>
                        <Text size='small' color={card.passive ? 'rgb(50,168,121)' : ''}>{card.getBonusText() + ((card.passive && !card.data.effect.endsWith('(Passive)')) ? ' (Passive)' : '')}</Text>
                        {(!isMaxed) && <Text size="xsmall" color={'grey'}>{card.count} / {(card.getCardsForStar(5))}</Text>}
                    </Box>
                </Box>
            </TipDisplay>
        </ShadowBox>
    )
}

const CardSetBox = ({ cardSet }: { cardSet: CardSet }) => {
    const currentLevel = cardSet.getLevel();
    const nextLevel = currentLevel+1;
    const totalCardLevels = cardSet.getCardsTotalStars()

    return (
        <Box background='dark-1' style={{ opacity: cardSet.cards?.reduce((sum, card) => { return sum + card.count; }, 0) > 0 ? 1 : 0.5 }} gap='small' pad='medium'>
            <Box direction='column' gap='small' align='center'>
                <TipDisplay
                    heading={cardSet.displayName + " Set"}
                    body={
                        <Box margin={{ bottom: 'xsmall' }} direction='column' gap='medium'>
                            <Text size="small">Cards levels : {totalCardLevels} / {cardSet.cards?.length * 6}</Text>
                            {(currentLevel < 6) &&
                                <Box direction='column' gap='xsmall'>
                                    <Text size="small">Next bonus level in {(cardSet.cards?.length * (nextLevel)) - totalCardLevels} card levels :</Text>
                                    <Text size="small">{cardSet.getBonusText(nextLevel)}</Text>
                                </Box>
                            }
                        </Box>
                    }
                >
                    <Box direction='row' gap='small' align='center'>
                        <Stack>
                            <Box>
                                <IconImage data={cardSet.getImageData()} />
                            </Box>
                            <Box>
                                <IconImage data={cardSet.getBorderImageData()} />
                            </Box>
                        </Stack>        
                        <Box direction='column' gap='none'>
                            <AdaptativeIconImage data={cardSet.getBannerImageData()}/>
                            <Text size='medium' color={cardSet.getBonus() == 0 ? 'grey' : ''}>{cardSet.getBonusText()}</Text>
                        </Box>                    
                    </Box>
                </TipDisplay>
                <Grid width='100%' columns='small' gap='small'>
                    {
                        cardSet.cards?.sort((a, b) => a.data.order - b.data.order).map((card, index) => <CardBox key={index} card={card} />)
                    }
                </Grid>
            </Box>
        </Box>
    )
}

function CardsDisplay() {
    const [cards, setCardsData] = useState<Card[]>();
    const [sort, setSort] = useState<string>('');
    const [filter, setFilter] = useState<string[]>([]);
    const [allFilterOptions, setAllFilterOptions] = useState<string[]>([]);
    const [currentFilterOptions, setCurrentFilterOptions] = useState<string[]>([]);
    const cardSets = CardSet.fromBase(initCardSetRepo(), cards) as CardSet[];
    const appContext = useContext(AppContext);

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            setCardsData(theData.get("cards"));
            cardSets.forEach(cardSet => { cardSet.cards = (cards) ? cards.filter(card => card.data.category == cardSet.cardSetName) : [] });

            if (cards) {
                const filterOptions = cards.filter(card => card.displayName != "New Monster?").map(card => {
                    return card.data.effect.replaceAll('+', '').replaceAll('%', '').replaceAll('{', '').replaceAll('(Passive)', '').trim();
                }).filter(uniqueFilter).sort();
        
                // We keep two set of state, all available filter options and currently available ones.
                // The reason for the 2nd one is to allow the search to remove filters based on user typing.
                setAllFilterOptions(filterOptions);
                setCurrentFilterOptions(filterOptions);
            }
        }
    }, [appContext])

    // our sort options are fixed, so just statically set them.
    const sortOptions = ["Level", "Least Cards to Next Level"];

    const cardsToShow = useMemo(() => {
        // If we are still loading, do nothing.
        if (!cards) {
            return [];
        }

        let cardsToDisplay = cards.filter(card => card.displayName != "New Monster?");

        // If we have any filters configured, filter them out of the base set
        if (filter.length != 0) {
            cardsToDisplay = cardsToDisplay.filter(card => filter.includes(card.data.effect.replaceAll('+', '').replaceAll('%', '').replaceAll('{', '').replaceAll('(Passive)', '').trim()));
        }

        // Now we sort
        return cardsToDisplay?.sort((card1, card2) => {
            // Base case scenario they are just by index.
            const indexSort = card1.index > card2.index ? 1 : -1;

            // Least cards to next level sort function
            function sortByCardsToNextLevel(card1: Card, card2: Card) {
                const currentCard1Level = card1.getStars();
                // If card is max level, move it to the end
                if (card1.fivestar ? currentCard1Level == 5 : currentCard1Level == 4) {
                    return 1;
                }
                const currentCard2Level = card2.getStars();
                // If card is max level, move it to the end
                if (card2.fivestar ? currentCard2Level == 5 : currentCard2Level == 4) {
                    return -1;
                }
                // Else sort by cards till next level
                return (card1.count > 0 ? (card1.getCardsForStar(currentCard1Level + 1) - card1.count) : 1) > (card2.count > 0 ? (card2.getCardsForStar(currentCard2Level + 1) - card2.count) : 1) ? 1 : -1;
            }

            // Sort by level sort function
            function sortByLevel(card1: Card, card2: Card) {
                // Card will be level 0 if they either have no cards at all or if they are level 0 (so borderless)
                if (card1.count == 0 || card2.count == 0) {
                    return card1.count > card2.count ? -1 : 1;
                }

                // If they both have at least one card, we can do traditionnal checks
                const currentCard1Level = card1.getStars();
                const currentCard2Level = card2.getStars();
                if (currentCard1Level == currentCard2Level) {
                    // If level is still equal, sort by time until next level
                    return sortByCardsToNextLevel(card1, card2);
                } else {
                    // if level isn't equal, just sort by level
                    return currentCard1Level > currentCard2Level ? -1 : 1;
                }
            }

            switch (sort) {
                case "Level":
                    return sortByLevel(card1, card2);
                case "Least Cards to Next Level":
                    return sortByCardsToNextLevel(card1, card2);
                default:
                    return indexSort;
            }
        })
    }, [cards, sort, filter])

    if (!cards || !cardSets) {
        return null;
    }

    return (
        <Box gap='medium'>
            <NextSeo title="Cards" />
            <Heading level='2' size='medium' style={{ fontWeight: 'normal' }}>Cards</Heading>
            <Box direction="row" gap="medium">
                <Select size="small"
                    placeholder="Sort by"
                    clear
                    value={sort}
                    options={sortOptions}
                    onChange={({ value: nextValue }) => { setSort(nextValue); }}
                />
                <SelectMultiple
                    size="small"
                    placeholder="Filter by"
                    searchPlaceholder="Search bonuses"
                    value={filter}
                    options={currentFilterOptions}
                    onChange={({ value: nextValue }) => { setFilter(nextValue); }}
                    onSearch={text => {
                        // The line below escapes regular expression special characters:
                        // [ \ ^ $ . | ? * + ( )
                        const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

                        // Create the regular expression with modified value which
                        // handles escaping special characters. Without escaping special
                        // characters, errors will appear in the console
                        const exp = new RegExp(escapedText, 'i');
                        setCurrentFilterOptions(allFilterOptions.filter(o => exp.test(o)));
                    }}
                    onClose={() => setCurrentFilterOptions(allFilterOptions)}
                />
            </Box>
            {
                sort == '' && filter.length == 0 &&
                <Grid columns={{ size: 'auto', count: 1 }} gap='medium'>
                    {
                        cardSets?.map((cardSet, index) => <CardSetBox key={index} cardSet={cardSet} />)
                    }
                </Grid>
            }      
            {
                (sort != '' || filter.length > 0) &&
                <Grid width='100%' columns='small' gap='small'>
                    {
                        cardsToShow?.map((card, index) => <CardBox key={index} card={card} />)
                    }
                </Grid>
            }         
        </Box>
    )
}

export default CardsDisplay;