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
      this.heartBackgroundBlack[i] = document.getElementById(`heart_background_black_${i}`)
      this.heartFull[i] = document.getElementById(`heart_full_${i}`)
      this.heartHalf[i] = document.getElementById(`heart_half_${i}`)
    }

    this.cross.style.display = 'block'
    this.crossbar.style.display = 'block'
    this.crossbar_selected.style.display = 'block'
    document.getElementById('login').style.display = 'none'
    document.getElementById('heart_background_black').style.display = 'block'
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
  }
}

module.exports = UIManager
