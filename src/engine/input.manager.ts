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

    public update(game: Game, delta: number): void {

        this.UnPressKeys();

        if(game.input.keyboard.wasPressed(this.kbUp)){
            this.upPressed = true;
            this.keyHeld = true;
            this.firstPress = true;
        }
        if(game.input.keyboard.isHeld(this.kbUp)){
            this.keyTimer += delta;
        }
        if(!this.firstPress){
            if(this.keyTimer > 150){
                this.upPressed = true;
                this.keyTimer = 0;
            }
        }
        else{
            if(this.keyTimer > 750){
                this.firstPress = false;
                this.upPressed = true;
                this.keyTimer = 0;
            }
        }
        if(game.input.keyboard.wasReleased(this.kbUp)){
            this.keyHeld = false;
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