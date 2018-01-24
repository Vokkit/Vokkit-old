let languageData = {
  ko: {
    command_stop_description: '서버를 중지합니다.',
    command_stop_message: '서버를 종료합니다.',
    command_stop_saving_world: '월드를 저장하는 중...',
    command_stop_save_world: '월드를 저장했습니다.',

    command_help_header: '--- 도움말 %s / %s 페이지 (/help <page>) ---',
    command_help_footer: '팁: 명령을 입력하는 동안 <tab> 키를 사용하여 명령 또는 인수를 자동 완성 할 수 있습니다',
    command_help_description: '도움말/명령어 목록을 제공합니다.',

    command_say_description: '채팅창의 메시지를 다른 플레이어에게 보냅니다.',

    command_tp_description: '엔티티(플레이어, 몹 등)를 순간이동합니다.',
    command_tp_success: '%s님을 %s(으)로 순간이동했습니다',
    command_tp_success_coordinates: '%s님을 %s, %s, %s 좌표로 순간이동했습니다',
    command_tp_notSameDimension: '플레이어가 다른 차원에 있어 순간이동을 할 수 없습니다',

    command_tell_description: '한 명 이상의 플레이어에게 쪽지를 보냅니다.',

    command_setblock_description: '블록을 다른 블록으로 변경합니다.',
    command_setblock_success: '블록 설치됨',
    command_setblock_failed: '블록 설치 불가',
    command_setblock_tagError: '데이터 태그 구문 분석 실패: %s',
    command_setblock_outOfWorld: '월드 바깥에 블록을 놓을 수 없습니다',
    command_setblock_notFound: 'ID/name %s에 해당하는 블록이 없습니다',
    command_setblock_noChange: '블록을 놓을 수 없습니다',

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
    command_stop_description: 'Stops the server.',
    command_stop_message: 'Stopping Server.',
    command_stop_saving_world: 'Saving World...',
    command_stop_save_world: 'Saved World.',
    command_stop_usage: '/stop',

    command_help_description: 'Provides help/list of commands.',
    command_help_header: '--- Showing help page %s of %s (/help <page>) ---',
    command_help_footer: 'Tip: Use the <tab> key while typing a command to auto-complete the command or its arguments',
    command_help_usage: '/help [page|command name]',

    command_say_description: 'Sends a message in the chat to other players.',
    command_say_usage: '/say <message ...>',
    command_say_format: '[%s] %s',

    command_tp_description: 'Teleports entities (players, mobs, etc.).',
    command_tp_usage: '/tp [target player] <destination player> OR /tp [target player] <x> <y> <z> [<yaw> <pitch>]',
    command_tp_success: 'Teleported %s to %s',
    command_tp_success_coordinates: 'Teleported %s to %s, %s, %s',
    command_tp_notSameDimension: 'Unable to teleport because players are not in the same dimension',

    command_tell_description: 'Sends a private message to one or more players.',
    command_tell_usage: '/tell <player> <private message ...>',
    command_tell_format: '%s -> %s: %s',

    command_setblock_description: 'Changes a block to another block.',
    command_setblock_usage: '/setblock <x> <y> <z> <block> [dataValue|state] [oldBlockHandling] [dataTag]',
    command_setblock_success: 'Block placed',
    command_setblock_failed: 'Unable to place block',
    command_setblock_tagError: 'Data tag parsing failed: %s',
    command_setblock_outOfWorld: 'Cannot place block outside of the world',
    command_setblock_notFound: 'There is no such block with ID/name %s',
    command_setblock_noChange: 'The block couldn\'t be placed',

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
