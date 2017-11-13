class UIManager {
  init () {
    this.cross = document.getElementById('cross')
    this.crossbar = document.getElementById('crossbar')
    this.crossbar_selected = document.getElementById('crossbar_selected')
    this.chatLog = document.getElementById('chatLog')
    this.chatWindow = document.getElementById('chatWindow')

    this.heartBackgroundBlack = []
    this.heartFull = []
    this.heartHalf = []

    for (let i = 0; i < 10; i++) {
      //this.heartBackgroundBlack[i] = document.getElementById(`heart_background_black_${i}`)
      this.heartFull[i] = document.getElementById(`heart_full_${i}`)
      this.heartHalf[i] = document.getElementById(`heart_half_${i}`)
    }

    this.heartBackgroundBlack = document.getElementById('heart_background_black')
    this.heartBackgroundWhite = document.getElementById('heart_background_white')

    this.cross.style.display = 'block'
    this.crossbar.style.display = 'block'
    this.crossbar_selected.style.display = 'block'
    document.getElementById('login').style.display = 'none'
    this.heartBackgroundBlack.style.display = 'block'

    this.lastHealth = 0
  }

  toggleChat () {
    if (this.isChatting()) this.chatWindow.style.display = 'none'
    else this.chatWindow.style.display = 'block'
  }

  isChatting () {
    return this.chatWindow.style.display === 'block'
  }

  addChat (sender, message, format) {
    this.chatLog.innerText += format.replace('%s', sender).replace('%s', message)
  }

  clearChat () {
    this.chatLog.innerText = ''
  }

  updateCrossbarSelected () {
    const selectedSlotId = Vokkit.getClient().getLocalPlayer().getSelectedSlotId()
    this.crossbar_selected.style.left = `calc(31.8% - 0.2vw + ${selectedSlotId * 4}vw)`
  }

  updateHealthBar () {
    const health = Vokkit.getClient().getLocalPlayer().getHealth()
    if (health < this.lastHealth) {
      let count = 0
      const manager = this
      const animation = () => {
        if (count % 2 == 0) {
          manager.heartBackgroundBlack.style.display = 'block'
          manager.heartBackgroundWhite.style.display = 'none'
        } else {
          manager.heartBackgroundBlack.style.display = 'none'
          manager.heartBackgroundWhite.style.display = 'block'
        }

        if (count > 3) {
          clearInterval(interval)
        }

        count++
      }

      animation()
      const interval = setInterval(animation, 150)
    }
    const fullHeart = Math.floor(health / 2)

    let i = 0

    for (; i < fullHeart;) {
      this.heartFull[i].style.display = 'block'
      this.heartHalf[i].style.display = 'none'
      i++
    }

    if (health % 2 == 1 && i < 10) {
      this.heartFull[i].style.display = 'none'
      this.heartHalf[i].style.display = 'block'
      i++
    }

    for (; i < 10; i++) {
      this.heartFull[i].style.display = 'none'
      this.heartHalf[i].style.display = 'none'
    }

    this.lastHealth = health
  }

}

module.exports = UIManager
