const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

//creating field class
class Field {
    constructor(field){
        this.field = field;
    };
    printState() {
        this.field.forEach((ele) => console.log(ele.join('')));
    };
    static generateField(ht,width){
        // initializing 2d array with ░
        let array2D = [];
        for (let i=0;i<ht;i++){
            let array1D=[];
            for (let j=0;j<width;j++){
                array1D.push(randomChar());
            };
            array2D.push(array1D);
        }
        // setting the starting point at (0,0) position
        array2D[0][0] =pathCharacter;
        // randomly generate coordinates of hat (p,q)
        let p = Math.floor(Math.random()*(ht-1))+1;
        let q = Math.floor(Math.random()*(width-1)+1);
        // implementing some hacks to ensure maze is solvable
        // 1. buldozing the holes neighbours at a dist of 1 from (p,q)
        for (let i=-1;i<2;i++){
          array2D[p][q+i] = fieldCharacter;
          array2D[p+i][q] = fieldCharacter;
        }
        // 2. ensuring no holes at a distance of one from starting position
        array2D[0][1]=fieldCharacter;
        array2D[1][0]=fieldCharacter;
        array2D[1][1]=fieldCharacter;
        // placing the hat
        array2D[p][q] =hat;
        return array2D;
    };
  };

  // helper function
function randomChar() {
      let index = Math.floor(Math.random()*10);
      let randChar;
      if (index<7){
        randChar = fieldCharacter;
      } else {
        randChar = hole;
      }
      return randChar;
};

// game starts
const newGame =new Field(Field.generateField(7,7));
newGame.printState();
  let flag = true;
  let i=0;
  let j=0;
  while (flag){
      console.clear();
      newGame.printState();
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
      if (i<0 || i>newGame.field.length-1 || j<0||j>newGame.field[0].length-1) {
          switch(dir){
            case 'u':
                i++;
                break;
            case 'd':
                i--;
                break;
            case 'r':
                j--;
                break;
            case 'l':
                j++;
                break;
            };
          dir = prompt( `Going out of bounds is not allowed! press enter to continue: `);
        } else if (newGame.field[i][j]==hole){
          console.log('You stepped on a hole, game over');
          flag =false;
        } else if (newGame.field[i][j]==hat){
          console.log('Congratulations, you have found the hat!');
          flag =false;
        } else if(newGame.field[i][j]==pathCharacter){
          switch(dir){
            case 'u':
                i++;
                break;
            case 'd':
                i--;
                break;
            case 'r':
                j--;
                break;
            case 'l':
                j++;
                break;
          };
          dir = prompt( `Retracing your step is not allowed! Press enter to continue: `);
        } else{
          newGame.field[i][j]=pathCharacter;
        }
  }
