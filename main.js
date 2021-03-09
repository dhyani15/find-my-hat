const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

//creating field class
class Field {
    constructor(field){
        this.field = field;
    }
    printState() {
          this.field.forEach((ele) => console.log(ele.join('')));
      }
    static generateField(ht,width){
        let array2D = [];
        for (let i=0;i<ht;i++){
            let array1D=[];
            for (let j=0;j<width;j++){
                array1D.push(randomChar())
              }
            array2D.push(array1D)
          }
        array2D[0][0] =pathCharacter;
        let p = Math.floor(Math.random()*(ht-1))+1;
        let q = Math.floor(Math.random()*(width-1)+1)
        array2D[p][q] =hat;
        return array2D;
      }
  }
  // helper function
  function randomChar() {
        let index = Math.floor(Math.random()*10);
        let randChar;
        if (index>=0 && index<7){
          randChar = fieldCharacter;
        } else {
          randChar = hole
        }
        return randChar;
  }

// game starts
  const newGame =new Field(Field.generateField(7,7))
  let flag = true;
  let i=0;
  let j=0;
  while (flag){
      newGame.printState()
      let dir = prompt('select a new direction to move (u,d,r,l): ');
      switch(dir){
          case 'u':
              i--;
              break;
          case 'd':
              i++;
              break;
          case 'r':
              j++;
              break;
          case 'l':
              j--;
              break;
      }
      if (i<0 && i>newGame.field.length-1){
          console.log( `You left the board, game over`);
          flag = false;
      } else if (j<0 && j>newGame.field[0].length-1){
        console.log( `You left the board, game over`);
        flag = false;
      } else if (newGame.field[i][j]==hole){
          console.log('You stepped on a hole, game over');
          flag =false;
      } else if (newGame.field[i][j]==hat){
          console.log('Congratulations, you have found the hat!')
          flag =false;
      } else if(newGame.field[i][j]==pathCharacter){
          console.log('Retracing your step is not allowed')
      } else{
          newGame.field[i][j]=pathCharacter;
      }
  }