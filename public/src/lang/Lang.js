let languageData = {
  ko: {
    login_fail: '로그인 실패! 이유: %s',
    login_empty_id: '공백 ID를 사용할 수 없습니다.',
    login_long_id: 'ID는 %s자를 넘을 수 없습니다.',
    login_title: '로그인',
    chat_title: '채팅과 명령어',
    load_world: '월드를 불러오는 중',
    pause_resume: '계속하기',
    pause_quit: '종료'
  },
  en: {
    login_fail: 'Login failed! Reason: %s',
    login_empty_id: 'Cannot use empty ID.',
    login_long_id: 'ID cannot exceed %s characters.',
    login_title: 'Login',
    chat_title: 'Chats and Commands',
    load_world: 'Preparing World',
    pause_resume: 'Resume',
    pause_quit: 'Quit'
  }
}

class Lang {
  static setLanguage (language) {
    if (languageData[language]) {
      this.language = language
      this.data = languageData[language]
    } else {
      this.language = language
      this.data = languageData['en']
    }
  }

  static registerData (data) {
    languageData = Object.assign(data, languageData)
    if (languageData[this.language]) {
      this.data = languageData[this.language]
    } else {
      this.data = languageData['en']
    }
  }

  static format (key, args = []) {
    var ans = this.data[key.replace(/\./g, '_')]
    for (var i in args) {
      ans = ans.replace('%s', args[i])
    }
    return ans
  }
}

module.exports = Lang
