/**
 * Native runtime Rand functions captured 2026-10-23 via game-debug-tool toString.
 * Game version: 1.24 ("Halloween_Event").
 * Registry: Rand. Bodies are verbatim runtime source.
 */
// constructor
function(e){this.init(e)}
// hash
function(e,t){return null==t&&(t=5381),e=ag._mul(e,-862048943),t^=e=ag._mul(e<<15|e>>>17,461845907),t=ag._mul(t<<13|t>>>19,5)+-430675100|0,t=ag._mul(t^t>>16,-2048144789),(t=ag._mul(t^t>>13,-1028477387))^t>>16}
// inlineHash
function(e,t){return e=ag._mul(e,-862048943),t^=e=ag._mul(e<<15|e>>>17,461845907),t=ag._mul(t<<13|t>>>19,5)+-430675100|0,t=ag._mul(t^t>>16,-2048144789),(t=ag._mul(t^t>>13,-1028477387))^t>>16}
// init
function(e){this.seed=e,this.seed2=cc.hash(e),0==this.seed&&(this.seed=1),0==this.seed2&&(this.seed2=1)}
// rand
function(){return this.seed=36969*(65535&this.seed)+(this.seed>>16),this.seed2=18e3*(65535&this.seed2)+(this.seed2>>16),(1073741823&((this.seed<<16)+this.seed2|0))%10007/10007}
