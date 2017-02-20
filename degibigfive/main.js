phina.globalize();
// アセット
var ASSETS = {
  image: {
    'bgimage': 'https://cf.geekdo-images.com/images/pic3320301_md.jpg',
  },
};
PIECE_SIZE=50;

// 定数
var PIECE_NUM_XY = 7;              // 縦横のピース数
var PIECE_SIZE = 50; //* 0.95; // ピースの大きさ
var GRID_SIZE = PIECE_SIZE+2;
var GRID_SIZE_FULL = GRID_SIZE * PIECE_NUM_XY; //200;
//var PIECE_SIZE = GRID_SIZE * 0.95; // ピースの大きさ
var PIECE_OFFSET = GRID_SIZE_FULL/2 ;  // オフセット値
var PIECE_OFFSET_X = PIECE_SIZE +10;  //9+53*3.5 ;  // オフセット値
var PIECE_OFFSET_Y = PIECE_SIZE +50;  //53+53*3.5 ;  // オフセット値
var DATA_ARR_X=['●','◆','▲' ,'★','▼','|'];
var DATA_ARR_Y=['1','2','3','4','5','6' ];

phina.define('MainScene', {
  superClass: 'DisplayScene',
  // コンストラクタ
  init: function( param ) {
    // 定数
    var SUB_PIECE_NUM_XY = DATA_ARR_X.length;              // 縦横のピース数
    //var SUB_PIECE_SIZE = PIECE_SIZE; // ピースの大きさ
    var SUB_PIECE_OFFSET = GRID_SIZE / 2;  // オフセット値
    
    // 親クラス初期化
    this.superInit(
    {  // 画面サイズ指定
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    var self = this;
    // 背景色
    //this.backgroundColor = 'gray';
    // グリッド
    var GRID_SIZE = PIECE_SIZE /3*2;  // グリッドのサイズ
    //var piece_num = DATA_ARR_X.length;
    //if(DATA_ARR_X.length < DATA_ARR_Y.length){ piece_num=DATA_ARR_Y.length; }
    var piece_num = Math.floor(SCREEN_WIDTH/GRID_SIZE);
    console.log('piece_num='+piece_num);
    var grid = Grid({  width: SCREEN_WIDTH,
                        columns: piece_num,
                        offset: 30
                      });
    // ピースグループ
    var pieceGroup = DisplayElement()
                    .setPosition(0,0)
                    .addChildTo(this);
                    
    var cardSet = makeRandumCardSet()
    var pickNum=0;
    piece_x_max=SCREEN_WIDTH/PIECE_SIZE;
    cardSet.length.times(function( x ) {
      // ピース作成
      var piece = cardSet[ x ];
      piece.addChildTo(pieceGroup);
      //ピース配置
      piece_y = Math.floor(x/piece_x_max+1)-1;
      piece_x = x%piece_x_max+1-1;
      piece.x = grid.span( piece_x );
      piece.y = grid.span( piece_y );
      //console.log('piece_x ='+piece_x +' ,piece_y ='+piece_y );
    });
    
    function makeRandumCardSet(){
      var cardSet=[] ,cardSetTmp=[];
      DATA_ARR_X.length.times(function( x ) {
        DATA_ARR_Y.length.times(function( y ) {
          // ピース作成
          var piece = new Piece( DATA_ARR_X[ x ]+DATA_ARR_Y[ y ], PIECE_SIZE );
          cardSetTmp.push( piece );
        });
      });
      
      cardSetTmp.length.times(function( x ) {
        var pickNum = Math.floor(Math.random() * cardSetTmp.length);
        cardSet[x] = cardSetTmp[ pickNum ];
        cardSetTmp.splice(pickNum,1);
      });
      
      return cardSet;
    }
  },
});

/** memo
console.log(':'+);
console.log(JSON.stringify(this));
***/
