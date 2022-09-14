import { Box, Grid, Heading, ResponsiveContext, Text } from "grommet";
import { EmptyCircle, Tools, UserSettings } from "grommet-icons";
import { DirectionType } from "grommet/utils";
import { NextSeo } from "next-seo";
import { useContext, useEffect, useState } from "react";
import IconImage from "../../components/base/IconImage";
import ShadowBox from "../../components/base/ShadowBox";
import TextAndLabel, { ComponentAndLabel } from "../../components/base/TextAndLabel";
import { AppContext } from "../../data/appContext";
import { Account, Miniboss } from "../../data/domain/account";
import { Alerts, AlertType, PlayerAlert } from "../../data/domain/alerts";
import { EnemyInfo } from "../../data/domain/enemies";
import { GroupBy, nFormatter } from "../../data/utility";

function AlertDisplay({ alert }: { alert: PlayerAlert }) {

    return (
        <Box>
            {alert.type == AlertType.Anvil && <Tools size="medium" />}
            {alert.type == AlertType.CardSet && <UserSettings size="medium" />}
            {alert.type == AlertType.EmptyObolSlot && <EmptyCircle size="medium" />}
        </Box>
    )
}

function CharacterAlerts({ alerts }: { alerts: PlayerAlert[] }) {
    const player = alerts[0].player;

    return (
        <ShadowBox background="dark-1" gap="xsmall" direction="row" align="center">
            <Box direction="row" align="center" pad={{ top: "xsmall", bottom: "xsmall", left: "small", right: "small" }} gap="xsmall">
                <IconImage data={player.getClassImageData()} />
                <Box>
                    <Text color="grey-2" size="small" truncate={true}>{player.playerName}</Text>
                </Box>
            </Box>
            <Box>
                <Box direction="row" wrap>
                    {
                        alerts.map((alert, index) => <Box key={index} margin={{ right: 'small', bottom: 'small' }}><AlertDisplay alert={alert} /></Box>)
                    }
                </Box>
            </Box>
        </ShadowBox >
    )
}

function DashboardWidget({ children, direction = "row", wrap, heading }: { children: React.ReactNode, direction?: DirectionType, wrap?: boolean, heading: string }) {
    return (
        <ShadowBox background="dark-1" pad="small" margin={{ right: 'small', bottom: 'small' }}>
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

    console.log(Array.from(GroupBy(Object.entries(alertData.playerAlerts).flatMap(([_, alerts]) => alerts), "type")));

    return (
        <Box width={{ max: '1440px' }} pad={{ left: "large", right: 'large', bottom: 'medium' }} fill margin={{ left: 'auto', right: 'auto' }}>
            <NextSeo title="Dashboard" />
            <Grid columns={size == "small" ? ["100%"] : ["70%", "30%"]}>
                <Box>
                    <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Dashboard</Heading>
                    <Box direction="row" wrap>
                        <DashboardWidget direction="row" heading="Keys">
                            {
                                accountData.keys.filter(key => key.item.count > 0).map((key, index) => (
                                    <Box key={index} direction="row" pad={{ vertical: 'small' }} align="center" margin={{ right: 'small', bottom: 'small' }}>
                                        <Box>
                                            <IconImage data={key.item.getImageData()} scale={key.item.getImageData().width > 36 ? 0.5 : 1} />
                                        </Box>
                                        <Text size="small">{nFormatter(key.item.count)}</Text>
                                    </Box>
                                ))
                            }
                        </DashboardWidget>
                        <DashboardWidget heading="Colo">
                            <Box direction="row" pad={{ vertical: 'small' }} align="center" margin={{ right: 'small', bottom: 'small' }}>
                                <Box>
                                    <IconImage data={accountData.coloTickets.getImageData()} scale={accountData.coloTickets.getImageData().width > 36 ? 0.5 : 1} />
                                </Box>
                                <Text size="small">{nFormatter(accountData.coloTickets.count)}</Text>
                            </Box>
                        </DashboardWidget>
                        <DashboardWidget heading="Minibosses">
                            {
                                accountData.miniBosses.map((miniBoss,index) => {
                                    const miniBossInfo = EnemyInfo.find(enemy => enemy.id == miniBoss.bossInternalName)
                                    if (!miniBossInfo) {
                                        return null
                                    }
                                    return (
                                        <Box key={`boss_${index}`} direction="row" margin={{right: 'small'}} align="center" gap="small">
                                            <IconImage data={miniBossInfo?.getImageData()} scale={0.8}/>
                                            <TextAndLabel 
                                                label="Current Count"
                                                text={miniBoss.currentCount.toString()}
                                            />
                                            <TextAndLabel 
                                                label="Days till +1"
                                                text={miniBoss.currentCount == miniBoss.getMaxCount() ? 'Maxed' : miniBoss.daysToNext.toString()}
                                            />
                                            <Text></Text>
                                        </Box>
                                    )
                                })
                            }
                        </DashboardWidget>
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