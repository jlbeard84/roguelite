import { Game } from "./game.engine";
import { Actor, Input } from "excalibur";

export class InputManager extends Actor {

    public downPressed : boolean;
    public upPressed : boolean;
    public leftPressed : boolean;
    public rightPressed : boolean;

    public aPressed : boolean;
    public bPressed : boolean;

    protected kbUp : Input.Keys = Input.Keys.Up;
    protected kbDown : Input.Keys = Input.Keys.Down;
    protected kbLeft : Input.Keys = Input.Keys.Left;
    protected kbRight : Input.Keys = Input.Keys.Right;
    protected kbAccept : Input.Keys = Input.Keys.Z;
    protected kbCancel : Input.Keys = Input.Keys.X;

    private keyTimer : number = 0;
    private firstPress : boolean = false;
    private keyHeld : boolean = false;
    private thisKey : Input.Keys;
    private lastKey : Input.Keys = null;

    public update(game: Game, delta: number): void {

        this.UnPressKeys();

        if(game.input.keyboard.wasPressed(this.kbUp)){
            this.lastKey = this.kbUp;
            this.FirstDepress(this.lastKey);
        }
        else if(game.input.keyboard.wasPressed(this.kbDown)){
            this.lastKey = this.kbDown;
            this.FirstDepress(this.lastKey);
        }
        else if(game.input.keyboard.wasPressed(this.kbLeft)){
            this.lastKey = this.kbLeft;
            this.FirstDepress(this.lastKey);
        }
        else if(game.input.keyboard.wasPressed(this.kbRight)){
            this.lastKey = this.kbRight;
            this.FirstDepress(this.lastKey);
        }

        if(game.input.keyboard.isHeld(this.lastKey)){
            this.keyTimer += delta;
        }
        
        if(!this.firstPress){
            if(this.keyTimer > 150){
                this.Depress(this.lastKey);
            }
        }
        else{
            if(this.keyTimer > 750){
                this.firstPress = false;
                this.Depress(this.lastKey);
            }
        }

        if(game.input.keyboard.wasReleased(this.lastKey)){
            this.keyHeld = false;
            this.lastKey = null;
        }

    }

    private FirstDepress(key : Input.Keys){
        this.Depress(key);
        this.keyHeld = true;
        this.firstPress = true;
    }

    private Depress(key : Input.Keys){
        if(key == this.kbUp){
            this.upPressed = true;
            this.keyTimer = 0;
        }
        else if(key == this.kbDown){
            this.downPressed = true;
            this.keyTimer = 0;
        }
        else if(key == this.kbLeft){
            this.leftPressed = true;
            this.keyTimer = 0;
        }
        else if(key == this.kbRight){
            this.rightPressed = true;
            this.keyTimer = 0;
        }
    }

    private UnPressKeys(){
        this.upPressed = false;
        this.downPressed = false;
        this.leftPressed = false;
        this.rightPressed = false;
    }
}