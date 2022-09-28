import { Box, Grid, Heading, ResponsiveContext, Text } from "grommet";
import { EmptyCircle, Tools, UserSettings, BarChart, CircleInformation } from "grommet-icons";
import { DirectionType } from "grommet/utils";
import { NextSeo } from "next-seo";
import { useContext, useEffect, useMemo, useState } from "react";
import IconImage from "../../components/base/IconImage";
import ShadowBox from "../../components/base/ShadowBox";
import TextAndLabel, { ComponentAndLabel } from "../../components/base/TextAndLabel";
import { AppContext, AppStatus } from "../../data/appContext";
import { Account, Key } from "../../data/domain/account";
import { Alerts, AlertType, PlayerAlert, Alert } from "../../data/domain/alerts";
import { EnemyInfo } from "../../data/domain/enemies";
import { getCoinsArray, nFormatter } from "../../data/utility";
import TipDisplay from "../../components/base/TipDisplay";
import { Activity } from "../../data/domain/player";
import CoinsDisplay from "../../components/coinsDisplay";
import { TimeDown } from "../../components/base/TimeDisplay";
import { Arcade } from "../../data/domain/arcade";

const isPlayerAlert = (x: Alert): x is PlayerAlert => "player" in x

function KeyDisplay({ toShow }: { toShow: Key }) {
    return (
        <Box>
            <TipDisplay
                visibility={toShow.amountPerDay == 0 ? 'none' : ''}
                heading={`${toShow.item.displayName} (${toShow.keysAvailableForPickup()} available to pickup)`}
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
                    <Box margin={{ right: 'small' }}>
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
        </Box>
    )
}

function ActivityDisplay({ activity, count }: { activity: Activity, count: number }) {
    const size = useContext(ResponsiveContext);
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
            <IconImage data={getImageData(activity)} scale={size == "small" ? 0.7 : 1} />
            <Text size="small">{count}</Text>
        </Box>
    )
}

function AlertDisplay({ alert, iconScale = 1 }: { alert: Alert, iconScale?: number }) {
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
                {alert.icon ? <IconImage data={alert.icon} scale={iconScale} /> : getIcon(alert)}
            </TipDisplay>
        </Box>
    )
}

function CharacterAlerts({ alerts }: { alerts: PlayerAlert[] }) {
    const player = alerts[0].player;

    return (
        <Box background="dark-3" gap="xsmall" direction="row" align="center" pad='16px'>
            <Box fill direction="row">
                <Box align="center" gap="xsmall" margin={{ right: '16px' }}>
                    <IconImage data={player.getClassImageData()} />
                </Box>
                <Box fill>
                    <Box pad={{ vertical: 'small' }}>
                        <Text weight='bold' size="small" truncate={true}>{player.playerName}</Text>
                    </Box>
                    <Box direction="row" wrap border={{ side: 'top', color: 'grey-1', size: '1px' }} pad={{ top: 'xsmall' }}>
                        {
                            alerts.map((alert, index) => <Box margin={{ right: 'xsmall' }} key={index}><AlertDisplay alert={alert} iconScale={0.7} /></Box>)
                        }
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}

function DashboardWidget({ children, direction = "row", wrap, heading, gridArea }: { children: React.ReactNode, direction?: DirectionType, wrap?: boolean, heading: string, gridArea?: string }) {
    return (
        <ShadowBox background="dark-1" pad="24px" margin={{ right: 'small', bottom: 'small' }} gridArea={gridArea}>
            <ComponentAndLabel
                label={heading}
                labelSize="medium"
                labelColor="white"
                component={
                    <Box direction={direction} wrap={wrap} alignContent='evenly' align='stretch'>
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

    const playerAlerts = useMemo(() => {
        return Object.entries(alertData.playerAlerts).filter(([_, alerts]) => alerts.length > 0)
    }, [alertData]);

    // We have a single column layout if it's a public profile, small screen, or not player alerts. Else 2 columns.
    const mainColumns = appContext.status == AppStatus.StaticData || size == "small" || playerAlerts.length == 0 ? ["100%"] : ["75%", "25%"];
    // If single column, use a different grid layout.
    const dashboardGridArea = appContext.status == AppStatus.StaticData || playerAlerts.length == 0 ?
        [
            { name: 'accountItems', start: [0, 0], end: [2, 0] },
            { name: 'money', start: [0, 1], end: [1, 1] },
            { name: 'activity', start: [1, 1], end: [2, 1] },
            { name: 'minibosses', start: [0, 2], end: [1, 2] },
            { name: 'library', start: [1, 2], end: [2, 2] },
            { name: 'globalAlerts', start: [0, 3], end: [2, 3] },
        ]
        :
        [
            { name: 'accountItems', start: [0, 0], end: [2, 0] },
            { name: 'money', start: [0, 1], end: [1, 1] },
            { name: 'activity', start: [1, 1], end: [2, 1] },
            { name: 'minibosses', start: [0, 2], end: [2, 2] },
            { name: 'library', start: [0, 3], end: [1, 3] },
            { name: 'globalAlerts', start: [1, 3], end: [2, 3] },
        ]

    return (
        <Box width={{ max: '1440px' }} pad={{ left: "large", right: 'large', bottom: 'medium' }} fill margin={{ left: 'auto', right: 'auto' }}>
            <NextSeo title="Dashboard" />
            <Grid columns={mainColumns}>
                <Box pad={{ right: '24px' }}>
                    <Box direction="row" align="center">
                        <Heading margin={{ right: 'small' }} level="2" size="medium" style={{ fontWeight: 'normal' }}>Dashboard</Heading>
                        <TipDisplay
                            heading="This is a work in progress"
                            body={
                                <Box gap="xsmall">
                                    <Text size="small">Only a handful of alerts are supported at the moment but more will be added over time.</Text>
                                    <Text size="small">For suggestions and feature requests, please reach out to me over Discord (see link at the bottom)</Text>
                                </Box>
                            }
                        >
                            <CircleInformation size="small" />
                        </TipDisplay>
                    </Box>
                    <Grid
                        areas={dashboardGridArea}
                        columns={[
                            ["50%", "20%", "30%"]
                        ]}
                        gap="24px"
                        rows={["fit", "fit", "fit", "fit"]}
                    >
                        <DashboardWidget direction="row" heading="Account wide items" wrap gridArea="accountItems">
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
                            <Box direction="row" border={{ color: 'grey-1' }} background="accent-4" pad='small' align="center" margin={{ right: 'small', bottom: 'small' }}>
                                <Box>
                                    <IconImage data={Arcade.silverBallImageData()} />
                                </Box>
                                <Text size="small">{accountData.arcadeBallsToClaim}/{accountData.arcadeMaxBalls}</Text>
                            </Box>
                        </DashboardWidget>
                        <DashboardWidget heading="Money" gridArea="money">
                            <Box pad="small">
                                <CoinsDisplay coinMap={getCoinsArray(accountData.totalMoney)} maxCoins={4} />
                            </Box>
                        </DashboardWidget>
                        <DashboardWidget heading="Library" gridArea="library">
                            <Box direction="row" pad={{ vertical: 'small' }} gap="large" wrap>
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
                        <DashboardWidget heading="Minibosses" wrap gridArea="minibosses">
                            {
                                accountData.miniBosses.map((miniBoss, index) => {
                                    const miniBossInfo = EnemyInfo.find(enemy => enemy.id == miniBoss.bossInternalName)
                                    if (!miniBossInfo) {
                                        return null
                                    }
                                    return (
                                        <Box key={`boss_${index}`} border={{ color: 'grey-1' }} pad="16px" direction="row" margin={{ right: 'small', bottom: 'small' }} align="center" gap="small">
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
                        <DashboardWidget heading="Activity" gridArea="activity">
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
                            alertData.generalAlerts.length > 0 && appContext.status != AppStatus.StaticData &&
                            <DashboardWidget heading="Global Alerts" gridArea="globalAlerts">
                                {
                                    alertData.generalAlerts.map((alert, index) => (
                                        <Box key={index}>
                                            <AlertDisplay alert={alert} />
                                        </Box>
                                    ))
                                }
                            </DashboardWidget>
                        }
                    </Grid>
                </Box>
                {
                    appContext.status != AppStatus.StaticData && playerAlerts.length > 0 &&
                    <Box background="dark-1" pad={{ left: 'medium', right: 'medium' }}>
                        <Heading level="3" size="medium" style={{ fontWeight: 'normal' }}>Alerts</Heading>
                        <Box>
                            {
                                Object.entries(alertData.playerAlerts).filter(([_, alerts]) => alerts.length > 0).map(([playerID, playerAlerts]) => {
                                    return (
                                        <Box key={`alerts_${playerID}`} margin={{ bottom: 'small' }}>
                                            <CharacterAlerts alerts={playerAlerts as PlayerAlert[]} />
                                        </Box>
                                    )
                                })
                            }
                        </Box>
                    </Box>
                }
            </Grid>
        </Box>
    )
}

export default Dashboard;
