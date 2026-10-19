/**
 * Game formula snippet — idleon-efficiency formula research.
 * Function: _customBlock_ArbitraryCode5Inputs (from ActorEvents_12)
 * Game version: 1.23 ("Luminous_Menagerie")
 * Captured: 2026-10-17 via game-debug-tool (findFunction + toString)
 * Work reference: Menagerie Lumi helper input mapping
 */
function(e,t,i,n,a,s){return"add"==e?0!=i?((t+i)/i+.5*(n-1))/(t/i)*n*t:t*n:"addLower"==e?t+i*(n+1):"addDECAY"==e?50001>n?t*n:t*Math.min(5e4,n)+(n-5e4)/(n-5e4+15e4)*t*5e4:"decay"==e?t*n/(n+i):"decayLower"==e?t*(n+1)/(n+1+i)-t*n/(n+i):"decayMulti"==e?1+t*n/(n+i):"decayMultiLower"==e?t*(n+1)/(n+1+i)-t*n/(n+i):"bigBase"==e?t+i*n:"bigBaseLower"==e?i:"intervalAdd"==e?t+Math.floor(n/i):"intervalAddLower"==e?Math.max(Math.floor((n+1)/i),0)-Math.max(Math.floor(n/i),0):"reduce"==e?t-i*n:"reduceLower"==e?t-i*(n+1):"PtsSpentOnGuildBonus"==e?((t+i)/i+.5*(n-1))/(t/i)*n*t-i*n:0}
