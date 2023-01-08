const sprites = new Image()
sprites.src = './imgs/sprites.png'

const audioHit = new Audio()
audioHit.src = "./Efeitos/efeitos_hit.wav"

const canvasGame = document.getElementById('CanvasGame')
const contexto = canvasGame.getContext('2d')

const fazColizao = (flappyBird, chao) => {
    const flappyBirdPy = flappyBird.pY + flappyBird.altura
    const chaoPy = chao.pY

    if(flappyBirdPy >= chaoPy){
        return true
    } else {
        return false
    }
}

const criaFlappyBird = () => {
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 34,
        altura: 24,
        pX: 10,
        pY: 50,
        velocidade: 0,
        gravidade: .25,
        pulo: 4.6,
        atualiza() {
            if(fazColizao(flappyBird, chao)) {  
                audioHit.play()        
                setTimeout(() => {
                    MudaTela(Telas.Inicio)
                }, 500)

                return 
            }
         
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            flappyBird.pY = flappyBird.pY + flappyBird.velocidade
            
        },pula(){
            console.log(flappyBird.velocidade, 'antes')
            flappyBird.velocidade = - flappyBird.pulo
            console.log(flappyBird.velocidade, 'depois')
        },
        desenha() {
            contexto.drawImage(
                sprites,
                flappyBird.spriteX, flappyBird.spriteY, //Sprite X / Sprite Y
                flappyBird.largura, flappyBird.altura, // Tamnho do recorte da imagentes
                flappyBird.pX, flappyBird.pY,
                flappyBird.largura, flappyBird.altura
            )
        }
    }
    return flappyBird
}


const backGround = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    pX: 0,
    pY: canvasGame.height - 204,
    desenha() {
        contexto.fillStyle = '#70c5ce'
        contexto.fillRect(0, 0, canvasGame.clientWidth, canvasGame.height,)

        contexto.drawImage(
            sprites,
            backGround.spriteX, backGround.spriteY,
            backGround.largura, backGround.altura,
            backGround.pX, backGround.pY,
            backGround.largura, backGround.altura
        )
        contexto.drawImage(
            sprites,
            backGround.spriteX, backGround.spriteY,
            backGround.largura, backGround.altura,
            (backGround.pX + backGround.largura), backGround.pY,
            backGround.largura, backGround.altura
        )
    }
}

const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 221,
    altura: 112,
    pX: 0,
    pY: canvasGame.height - 112,
    desenha() {
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.pX, chao.pY,
            chao.largura, chao.altura
        )

        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            (chao.pX + chao.largura), chao.pY,
            chao.largura, chao.altura
        )
    }
}

const gameMessageReady = {
    spriteX: 133,
    spriteY: 0,
    largura: 174,
    altura: 152,
    pX: (canvasGame.width / 2) - 174 / 2,
    pY: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            gameMessageReady.spriteX, gameMessageReady.spriteY,
            gameMessageReady.largura, gameMessageReady.altura,
            (gameMessageReady.pX), gameMessageReady.pY,
            gameMessageReady.largura, gameMessageReady.altura
        )
    }
}

//  Telas

const globais = {}
let TelaAtiva = {}
const MudaTela = (novaTela) => {
    TelaAtiva = novaTela

    if(TelaAtiva.inicializa) {
        TelaAtiva.inicializa()
    }

}

const Telas = {
    Inicio: {
        inicializa(){
            globais.flappyBird = criaFlappyBird() 
        },
        desenha(){
            backGround.desenha()
            globais.flappyBird.desenha()
            chao.desenha()              
            gameMessageReady.desenha()
            
        }, 
        click(){
            MudaTela(Telas.Jogo)
        },
        atualiza(){
            
        }
    }
}

Telas.Jogo = {
    desenha(){
        backGround.desenha()
        chao.desenha()    
        globais.flappyBird.desenha()
    },
    click(){
        globais.flappyBird.pula()
    },
    atualiza(){
        globais.flappyBird.atualiza()
    }
}

const loop = () => {
    TelaAtiva.desenha()
    TelaAtiva.atualiza()
    
    requestAnimationFrame(loop)
}


window.addEventListener('click', () => {
    if(TelaAtiva.click) {
        TelaAtiva.click()
    }
})

MudaTela(Telas.Inicio)
loop()