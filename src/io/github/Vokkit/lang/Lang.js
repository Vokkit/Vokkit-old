let languageData = {
  ko: {
    command_quit_description: '서버를 종료합니다.',
    command_quit_message: '서버를 종료합니다.',
    command_help_description: '도움말을 출력합니다.',
    command_say_description: '메세지를 전달합니다.',
    command_say_format: '[%s] %s',
    command_teleport_description: '플레이어를 특정한 위치로 이동시킵니다.',
    command_teleport_target: '%s이(가) %s에게로 이동하였습니다.',
    command_teleport_to: '%s이(가) x: %s, y: %s, z: %s 좌표로 이동하였습니다.',
    command_tell_description: '누군가에게 메세지를 전달합니다.',
    command_tell_format: '$s -> %s: %s',
    cannot_find_command: '명령어를 찾을 수 없습니다.',
    system_message_format: '<Server> %s',
    player_quit_format: '%s님이 게임을 떠났습니다.',
    player_quit_message: '%s [%s:%s] 이(가) 로그아웃 했습니다.',
    player_list_log: 'Vokkit %s (%s)',
    login_empty_id: '공백 ID를 사용할 수 없습니다.',
    login_long_id: 'ID는 %s자를 넘을 수 없습니다.',
    login_same_id: 'ID가 중복됩니다.',
    player_login_format: '%s님이 게임에 참여했습니다.',
    player_login_message: '%s [%s:%s] 이(가) 로그인 했습니다.',
    plugin_loading: '%s %s 로드 중',
    plugin_load_succeed: '%s %s 로드 완료',
    plugin_load_fail: '%s %s 로드 중 오류가 발생했습니다.',
    client_building: '클라이언트 빌드 중...',
    plugin_compile_first: 'public/src를 먼저 컴파일 해주세요.',
    client_build_succeed: '클라이언트를 빌드했습니다.',
    client_build_fail: '클라이언트 빌드 오류 발생',
    plugin_enabling: '%s %s 활성화 중',
    plugin_enable_succeed: '%s %s 활성화 완료',
    plugin_enable_fail: '%s %s 활성화 중 오류가 발생했습니다.',
    server_creating_world: '월드를 생성하는 중...',
    server_created_world: '월드 생성됨',
    server_loading_world: '월드를 불러오는 중...',
    server_loaded_world: '%s개의 월드를 불러왔습니다.',
    server_loading_socket: '통신 기능을 불러오는 중...',
    server_loaded_socket: '통신 기능을 불러왔습니다.',
    server_opening: '서버를 여는 중...',
    server_open: '완료 (%s초)! 도움말을 보시려면 "help"를 입력해 주세요',
    server_preparing: 'Vokkit %s 실행 준비 중...'
  },
  en: {
    command_quit_description: 'Stopping Server.',
    command_quit_message: 'Stopping Server.',
    command_help_description: 'Shows help messages',
    command_say_description: 'say to server',
    command_say_format: '[%s] %s',
    command_teleport_description: 'teleports player to some location.',
    command_teleport_target: '%s was moved to %s',
    command_teleport_to: '%s was moved to x: %s, y: %s, z: %s',
    command_tell_description: 'say to someone',
    command_tell_format: '$s -> %s: %s',
    cannot_find_command: 'Cannot find command.',
    system_message_format: '<Server> %s',
    player_quit_format: '%s left the game.',
    player_quit_message: '%s [%s:%s] Logout',
    player_list_log: 'Vokkit %s (%s)',
    login_empty_id: 'Cannot use empty ID',
    login_long_id: 'ID cannot exceed %s characters.',
    login_same_id: 'same ID exists!',
    player_login_format: '%s joined the game',
    player_login_message: '%s [%s:%s] Login',
    plugin_loading: '%s %s Loading',
    plugin_load_succeed: '%s %s Loaded',
    plugin_load_fail: 'There was an error while attempting to load %s %s.',
    client_building: 'Building client..',
    plugin_compile_first: 'Please compile public/src first.',
    client_build_succeed: 'Client bulilding success',
    client_build_fail: 'There was an error while attempting to build client.',
    plugin_enabling: '%s %s enabling',
    plugin_enable_succeed: '%s %s enabled',
    plugin_enable_fail: 'There was an error while attempting to enable %s %s.',
    server_creating_world: 'Creating world...',
    server_created_world: 'Created world...',
    server_loading_world: 'Loading world...',
    server_loaded_world: 'Loaded %s worlds.',
    server_loading_socket: 'Loading socket...',
    server_loaded_socket: 'Loaded socket',
    server_opening: 'Opening server...',
    server_open: 'Done (%ss)! For help, type "help"',
    server_preparing: 'starting Vokkit %s...'
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
    let ans = this.data[key.replace(/\./g, '_')]
    for (const i in args) {
      ans = ans.replace('%s', args[i])
    }
    return ans
  }

  static formatString (string, args = []) {
    for (const i in args) {
      string = string.replace('%s', args[i])
    }
    return string
  }
}

module.exports = Lang
