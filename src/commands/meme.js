const path = require('path')
const Discord = require('discord.js')
const jimp = require('jimp')

const memeSctruct = {
    'Bolsonaro Dormindo' : {
        numberOfText: 2,
        font: jimp.FONT_SANS_64_WHITE,
        textsConfig: [
             {
                x: 0,
                y: 0,
                alignmentX: jimp.HORIZONTAL_ALIGN_CENTER
            },
             {
                x: 0,
                y: 310,
                alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
                alignmentY: jimp.VERTICAL_ALIGN_BOTTOM,
            },
        ]

    },
    'Drake Hotline Bling' : {
        numberOfText: 2,
        font: jimp.FONT_SANS_16_BLACK,
        textBlockWidth: 230,
        textsConfig: [
            {
               x: 261,
               y: 15,
               alignmentX: jimp.HORIZONTAL_ALIGN_LEFT
           },
            {
               x: 266,
               y: 270,
               alignmentX: jimp.HORIZONTAL_ALIGN_LEFT
           },
       ]
    },
    'Running Away Balloon' : {
        numberOfText: 4
    },
    'Tier Expanding Brain' : {
        numberOfText: 4
    },
}

const memeGenerate = async ({ msg }) => {
    const memeTemplate = Object.keys(memeSctruct).filter(key => {
        if(String(msg.content).toLocaleLowerCase().includes(key.toLocaleLowerCase())) return key
    })

   if(memeTemplate.length === 0) return msg.channel.send(memeHelp())

   const memeTexts = textProcess(msg.content)
    console.log(memeTexts)
   if(memeTexts.length !== memeSctruct[memeTemplate].numberOfText) return msg.channel.send(memeHelp())

   const img = await readyImage(memeTemplate[0].toLocaleLowerCase().replace(/\s/g, ''))
   jimp.loadFont(memeSctruct[memeTemplate].font).then( (font) => {

        return imageTextWriter(img, memeSctruct[memeTemplate].textsConfig, font, memeTexts, memeSctruct[memeTemplate])

   }).then(async img => {
       const imgBuffer = await img.getBufferAsync(img.getMIME())
       const attachment = new Discord.MessageAttachment(imgBuffer);
       msg.channel.send("Samuel meme", attachment)   })

}

const textProcess = (text) => {
    const textBetweenParentheses = text.match(/(\[)(.*)(\])/)[2]
    const memeTextsProcessed = textBetweenParentheses.replace(/\s/, '').match(/(\")(.*)(\")/)[0]
    const texts = memeTextsProcessed.split('"').filter(value => value.replace(/[|&;$%@"<>()+,]/g, "").length > 0)
    return texts
}

const imageTextWriter = (img, textConfigs, font, texts, memeSctruct) => {
    for(let i = 0; i < textConfigs.length; i++) {
        var textHight = jimp.measureTextHeight(font, texts[i])
        img.print(
            font,   
            textConfigs[i].x, 
            textConfigs[i].y,  
            {
                text: texts[i],
                alignmentX: textConfigs[i].alignmentX || 0,
                alignmentY: textConfigs[i].alignmentY || 0
            },
            memeSctruct.textBlockWidth || img.getWidth(),
            textHight,
        )
    }
    return img
}

 const readyImage = async (imgTemplate) => {
    return await jimp.read(path.join(__dirname, '..', 'memeTempletes', `${imgTemplate}.png`))
}

const memeHelp = () => {
    let message = '**O samuel possui os seguintes templates de memes: **\n'
    Object.keys(memeSctruct).map(key => {
        message += `${key} com ${memeSctruct[key].numberOfText} campos de texto disponiveis \n`
    })
    message += '**Formato do comando: Nome do template ["Texto1", "Texto2", ...]**'
    return message
}

module.exports = memeGenerate