"use client"

import {
    Box,
    Text,
    Heading,
    Grid,
    Stack
} from 'grommet'
import { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import ShadowBox from '../../../components/base/ShadowBox';
import IconImage, { AdaptativeIconImage } from '../../../components/base/IconImage';
import { Card } from '../../../data/domain/cards';
import { CardSet } from '../../../data/domain/cardSets';
import TipDisplay from '../../../components/base/TipDisplay';
import { initCardSetRepo } from '../../../data/domain/data/CardSetRepo';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';

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
                            <Box direction='row' justify='start' align='center' gap='xxsmall'>
                                <IconImage data={Card.getStarImageForLevel(5)} />
                                <Text size="small"> : {card.getBonusText(5)} ({Math.floor(card.getCardsForStar(5))} cards)</Text>
                            </Box>
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
    const nextLevel = currentLevel + 1;
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
                            <AdaptativeIconImage data={cardSet.getBannerImageData()} />
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
    const cardSets = CardSet.fromBase(initCardSetRepo(), cards) as CardSet[];
    const theData = useAppDataStore((state) => state.data.getData());

    useEffect(() => {
        setCardsData(theData.get("cards"));
        cardSets.forEach(cardSet => { cardSet.cards = (cards) ? cards.filter(card => card.data.category == cardSet.cardSetName) : [] });
    }, [theData, cardSets, cards])

    if (!cards || !cardSets) {
        return null;
    }

    return (
        <Box gap='medium'>
            <NextSeo title="Cards" />
            <Heading level='2' size='medium' style={{ fontWeight: 'normal' }}>Cards</Heading>
            <Grid columns={{ size: 'auto', count: 1 }} gap='medium'>
                {
                    cardSets?.map((cardSet, index) => <CardSetBox key={index} cardSet={cardSet} />)
                }
            </Grid>
        </Box>
    )
}

export default CardsDisplay;