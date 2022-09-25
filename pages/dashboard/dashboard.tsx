import { Box, Grid, Heading, ResponsiveContext, Text } from "grommet";
import { EmptyCircle, Tools, UserSettings, BarChart } from "grommet-icons";
import { DirectionType } from "grommet/utils";
import { NextSeo } from "next-seo";
import { useContext, useEffect, useState } from "react";
import IconImage from "../../components/base/IconImage";
import ShadowBox from "../../components/base/ShadowBox";
import TextAndLabel, { ComponentAndLabel } from "../../components/base/TextAndLabel";
import { AppContext } from "../../data/appContext";
import { Account, Key } from "../../data/domain/account";
import { Alerts, AlertType, PlayerAlert, Alert } from "../../data/domain/alerts";
import { EnemyInfo } from "../../data/domain/enemies";
import { getCoinsArray, nFormatter } from "../../data/utility";
import TipDisplay from "../../components/base/TipDisplay";
import { Activity } from "../../data/domain/player";
import CoinsDisplay from "../../components/coinsDisplay";
import { TimeDisplaySize, TimeDown } from "../../components/base/TimeDisplay";

const isPlayerAlert = (x: Alert): x is PlayerAlert => "player" in x

function KeyDisplay({ toShow }: { toShow: Key }) {
    return (
        <TipDisplay
            visibility={toShow.amountPerDay == 0 ? 'none' : ''}
            heading={toShow.item.displayName}
            body={
                <Box>
                    <Box direction="row" gap="small">
                        <TextAndLabel
                            label="Characters awarding keys per day"
                            text={`${toShow.amountPerDay}`}
                            labelColor="black"
                            textSize="large"
                        />
                        <TextAndLabel
                            label="Days since last Pickup"
                            text={`${toShow.daysSincePickup}`}
                            labelColor="black"
                            textSize="large"
                        />
                    </Box>
                    {
                        toShow.daysSincePickup >= 3 &&
                        <Text size="xsmall">3 days is the maximum for keys to accumulate, you are wasting keys. GO CLAIM!</Text>
                    }
                </Box>

            }
        >
            <Box direction="row" border={{ color: 'grey-1' }} background="accent-4" pad='small' align="center" margin={{ right: 'small', bottom: 'small' }}>
                <Box>
                    <IconImage data={toShow.item.getImageData()} scale={toShow.item.getImageData().width > 36 ? 0.5 : 1} />
                </Box>
                <Box>
                    <Text size="small">{nFormatter(toShow.item.count)}</Text>
                    {
                        toShow.amountPerDay > 0 &&
                        <Text color={toShow.daysSincePickup > 3 ? 'red' : ''} size="xsmall">{toShow.keysAvailableForPickup()}</Text>
                    }
                </Box>
            </Box>
        </TipDisplay>
    )
}

function ActivityDisplay({ activity, count }: { activity: Activity, count: number }) {
    const getImageData = (activity: Activity) => {
        var imageName: string = "";
        switch (activity) {
            case Activity.Fighting:
                imageName = 'ClassIconsF';
                break;
            case Activity.Lab:
                imageName = 'ClassIcons53';
                break;
            case Activity.Skilling:
                imageName = 'ClassIcons44';
                break;
            default:
                imageName = 'ClassIconsQmark';
                break;
        }

        return {
            location: imageName,
            height: 38,
            width: 36,
        }
    }
    return (
        <Box gap="small" align="center">
            <IconImage data={getImageData(activity)} />
            <Text size="small">{count}</Text>
        </Box>
    )
}

function AlertDisplay({ alert }: { alert: Alert }) {
    const getIcon = (alert: Alert) => {
        const playerAlert = isPlayerAlert(alert);
        switch (alert.type) {
            case AlertType.Anvil: return playerAlert ? <Tools size="medium" /> : null;
            case AlertType.CardSet: return playerAlert ? <UserSettings size="medium" /> : null;
            case AlertType.EmptyObolSlot: return playerAlert ? <EmptyCircle size="medium" /> : null;
            case AlertType.Worship: return playerAlert ? <BarChart size="medium" /> : null;
            default: return null;
        }
    }

    const alertIcon = getIcon(alert);

    return (
        <Box>
            <TipDisplay
                heading={alert.title}
                body={alert.text}>
                {alert.icon ? <IconImage data={alert.icon} /> : getIcon(alert)}
            </TipDisplay>
        </Box>
    )
}

function CharacterAlerts({ alerts }: { alerts: PlayerAlert[] }) {
    const player = alerts[0].player;

    return (
        <ShadowBox background="dark-1" gap="xsmall" direction="row" align="center">
            <Box direction="row" align="center" pad={{ top: "xsmall", bottom: "xsmall", left: "small", right: "small" }} gap="xsmall" width={{ min: '120px', max: '120px'}}>
                <IconImage data={player.getClassImageData()} scale={0.8}/>
                <Box>
                    <Text color="grey-2" size="xsmall" truncate={true}>{player.playerName}</Text>
                </Box>
            </Box>
            <Box>
                <Box direction="row" wrap>
                    {
                        alerts.map((alert, index) => <Box key={index}><AlertDisplay alert={alert} /></Box>)
                    }
                </Box>
            </Box>
        </ShadowBox >
    )
}

function DashboardWidget({ children, direction = "row", wrap, heading }: { children: React.ReactNode, direction?: DirectionType, wrap?: boolean, heading: string }) {
    return (
        <ShadowBox align='start' background="dark-1" pad="small" margin={{ right: 'small', bottom: 'small' }}>
            <ComponentAndLabel
                label={heading}
                labelSize="large"
                center
                component={
                    <Box direction={direction} wrap={wrap}>
                        {children}
                    </Box>
                } />
        </ShadowBox>
    )
}

function Dashboard() {
    const appContext = useContext(AppContext);
    const size = useContext(ResponsiveContext);
    const theData = appContext.data.getData();

    const [accountData, setAccountData] = useState<Account>(theData.get("account") as Account);
    const [alertData, setAlertData] = useState<Alerts>(theData.get("alerts") as Alerts);

    useEffect(() => {
        if (appContext && theData) {
            setAccountData(theData.get("account") as Account);
            setAlertData(theData.get("alerts") as Alerts);
        }
    }, [appContext]);

    return (
        <Box width={{ max: '1440px' }} pad={{ left: "large", right: 'large', bottom: 'medium' }} fill margin={{ left: 'auto', right: 'auto' }}>
            <NextSeo title="Dashboard" />
            <Grid columns={size == "small" ? ["100%"] : ["70%", "30%"]}>
                <Box>
                    <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Dashboard</Heading>
                    <Box direction="row" wrap>
                        <DashboardWidget direction="row" heading="Account wide items" wrap>
                            {
                                accountData.keys.filter(key => key.item.count > 0).map((key, index) => (
                                    <KeyDisplay key={index} toShow={key} />
                                ))
                            }
                            <Box direction="row" border={{ color: 'grey-1' }} background="accent-4" pad='small' align="center" margin={{ right: 'small', bottom: 'small' }}>
                                <Box>
                                    <IconImage data={accountData.coloTickets.getImageData()} scale={accountData.coloTickets.getImageData().width > 36 ? 0.5 : 1} />
                                </Box>
                                <Text size="small">{nFormatter(accountData.coloTickets.count)}</Text>
                            </Box>
                        </DashboardWidget>
                        <DashboardWidget heading="Money">
                            <Box pad="small">
                                <CoinsDisplay coinMap={getCoinsArray(accountData.totalMoney)} maxCoins={4} />
                            </Box>
                        </DashboardWidget>
                        <DashboardWidget heading="Library">
                            <Box direction="row" pad={{ vertical: 'small' }} gap="medium">
                                <IconImage data={accountData.library.getImageData()} />
                                <TextAndLabel
                                    label="Book count"
                                    text={accountData.library.currentBooks.toString()}
                                />
                                <ComponentAndLabel
                                    label={"Time till next"}
                                    component={
                                        <TimeDown addSeconds={accountData.library.secondsToNextCheckout} />
                                    }
                                />
                                {accountData.library.currentBooks < 20 &&
                                    <ComponentAndLabel
                                        label={"Time till 20"}
                                        component={
                                            <TimeDown addSeconds={accountData.library.secondsToMaxCheckout} />
                                        }
                                    />
                                }
                            </Box>
                        </DashboardWidget>
                        <DashboardWidget heading="Minibosses" wrap>
                            {
                                accountData.miniBosses.map((miniBoss, index) => {
                                    const miniBossInfo = EnemyInfo.find(enemy => enemy.id == miniBoss.bossInternalName)
                                    if (!miniBossInfo) {
                                        return null
                                    }
                                    return (
                                        <Box key={`boss_${index}`} direction="row" margin={{ right: 'small', bottom: 'small' }} align="center" gap="small">
                                            <IconImage data={miniBossInfo?.getImageData()} scale={0.5} />
                                            <TextAndLabel
                                                label="Current Count"
                                                labelSize="small"
                                                text={miniBoss.currentCount.toString()}
                                            />
                                            <TextAndLabel
                                                label="Days till +1"
                                                labelSize="small"
                                                text={miniBoss.currentCount == miniBoss.getMaxCount() ? 'Maxed' : miniBoss.daysToNext.toString()}
                                            />
                                            <Text></Text>
                                        </Box>
                                    )
                                })
                            }
                        </DashboardWidget>
                        <DashboardWidget heading="Activity">
                            {
                                Object.entries(accountData.activity).map(([activity, count], index) => {
                                    if (count == 0) {
                                        return null;
                                    }

                                    return (
                                        <Box key={index} title={activity} margin={{ right: 'small' }}>
                                            <ActivityDisplay activity={Activity[activity as keyof typeof Activity]} count={count} />
                                        </Box>
                                    )
                                })
                            }
                        </DashboardWidget>
                        {
                            alertData.generalAlerts.length > 0 &&
                            <DashboardWidget heading="Global Alerts">
                                {
                                    alertData.generalAlerts.map((alert, index) => (
                                        <Box key={index}>
                                            <AlertDisplay alert={alert} />
                                        </Box>
                                    ))
                                }
                            </DashboardWidget>
                        }
                    </Box>
                </Box>
                <Box>
                    <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Alerts</Heading>
                    <Box>
                        {
                            Object.entries(alertData.playerAlerts).filter(([_, alerts]) => alerts.length > 0).map(([playerID, playerAlerts]) => {
                                return (

                                    <Box key={`alerts_${playerID}`} margin={{ right: 'small', bottom: 'small' }}>
                                        <CharacterAlerts alerts={playerAlerts as PlayerAlert[]} />
                                    </Box>
                                )
                            })
                        }
                    </Box>
                </Box>
            </Grid>
        </Box>
    )
}

export default Dashboard;