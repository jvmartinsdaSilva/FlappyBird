const sprites = new Image()
sprites.src = './imgs/sprites.png'

const canvasGame = document.getElementById('CanvasGame')
const contexto = canvasGame.getContext('2d')


const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 34,
    altura: 24,
    pX: 10,
    pY: 50,
    velocidade: 0,
    gravidade: .25,
    atualiza(){
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;

        flappyBird.pY = flappyBird.pY + flappyBird.velocidade
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

const backGround = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    pX: 0,
    pY: canvasGame.height - 204,
    desenha(){
        contexto.fillStyle =  '#70c5ce'
        contexto.fillRect(0 , 0, canvasGame.clientWidth, canvasGame.height,)

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
    desenha(){
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

let motor = false

canvasGame.addEventListener('click', () => {
    motor = true
})


const loop = () => {
    flappyBird.atualiza()
    backGround.desenha()    
    flappyBird.desenha()
    chao.desenha()

    requestAnimationFrame(loop)
}

loop()