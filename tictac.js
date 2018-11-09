
function addBinaryScore(player,row,col)
{
    
    let index=[row, col];
    for(let i=0 ; i<3 ; i++)
    {
        if (i==0) // row calc
        {
            player[i][index[i]]+=2**(col);
        }
        if (i==1) // col calc
        {
            player[i][index[i]]+=2**(row);
        }
        if(row==col && i>=2)
        {
            player[i][0]+=2**(index[0]);
        }
        if(row+col==app.squares.length-1 && i>=2)
        {
            player[i][1]+=2**(col);
        }
    }
}
function BinaryScore(row,col)
{
    if (app.player_X_turn==true){addBinaryScore(app.playerScoreX,row,col)}
    else {addBinaryScore(app.playerScoreO,row,col)}
}
let win = function(score){
    return score === 7;
}
function checkWin(player){
    for(let i=0 ; i<3 ; i++)
    {
        if(player[i].some(win)){
            return true;
        }
    }
}
function checkDrew(){
    return (app.squares.every(row => {
        return row.every(x => x != null );
    }))
}

app =new Vue({
    el:'#tic-tac-app',
    data: {
        player_X_turn:true,
        squares:[[null,null,null],[null,null,null],[null,null,null]],
        playerScoreX:[[0,0,0],[0,0,0],[0,0]],
        playerScoreO:[[0,0,0],[0,0,0],[0,0]],
        winMsg:"",
        X_wins:0,
        O_wins:0,
        game_over:false
    },
    
    methods:{
        playerMove(row, colunn){
            if (this.player_X_turn==true){
                if(this.squares[row][colunn] !=null){return;}
                this.$set(this.squares[row], colunn, 'X')

                BinaryScore(row,colunn);
                this.player_X_turn=false
        }
        else{
            if(this.squares[row][colunn] !=null){return;}
            this.$set(this.squares[row], colunn, 'O')
            BinaryScore(row,colunn); 
            this.player_X_turn=true
        }
    },
    winnerCheck(){
        if (checkWin(this.playerScoreX))
        {
            this.game_over=true;
            this.X_wins++;
            this.winMsg="player X won ! wohoo ";
        }
        if (checkWin(this.playerScoreO))
        {
            this.game_over=true;
            this.O_wins++;
            this.winMsg="player C won ! wohoo ";
        }
        if(checkDrew())
        {
            this.game_over=true;
            this.winMsg="it's a DREW  ! bohoo ";
        }

    },
    
    restartGame(){   
        this.squares= this.squares.map(row => {
            return row.map(column => null)
        })
        this.playerScoreX= this.playerScoreX.map(row => {
            return row.map(column => null)
        })
        this.playerScoreO= this.playerScoreO.map(row => {
            return row.map(column => null)
        })
        this.player_X_turn=true;
        this.game_over=false;
        this.winMsg="";
    },
},
copmputed:{
}

});
