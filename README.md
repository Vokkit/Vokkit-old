# Vokkit

![Preview](./images/preview.png)

> Voxel server launcher accessed via a web browser

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## Changelog

See [CHANGELOG](./CHANGELOG.md)

## Features

- 청크 단위 사용: 상대적으로 성능이 안 좋아지는 웹에서도 시야를 타협해서 쾌적한 환경을 만들 수 있습니다.
- 청크 생성 최적화: 안 보이는 부분은 아예 생성조차 하지 않습니다.
- 웹에서 마인크래프트를 할 수 있습니다!


- Use Chunk: You can adjust your vision to create a pleasant environment
- Optimized Mesh Generation: It doesn't create an invisible part.
- We can play Minecraft on website!

## Known Bug

- 블럭 이미지 처리 문제: 블럭 모서리에 흰 선이 생깁니다.


- Block Texture Processing Problem: A white line appears on the block edge.

## Note

월드는 `worlds` 폴더에 텍스트 파일로 작성합니다. 예) `worlds/world.txt`


월드 형식은 `x,y,z,id`으로, id는 1이 돌, 2가 잔디, 3은 흙이며 한 줄당 한 블럭씩 작성해 주시면 됩니다.


처음 실행 시에 최상위 폴더에서 명령 `npm install`을 실행하세요. 


Vokkit을 실행하려면 `start.bat` 파일을 실행하시거나, 운영 체제가 Windows가 아닌 경우 명령 `node index.js`를 실행하시면 됩니다.


Write Vokkit's world as a text file in the `worlds` folder. ex) `worlds/world.txt`


World format is `x,y,z,id`. id 1 is Stone, 2 is Grass, 3 is Dirt, and You can write one block per line.


Run the `npm install` command from the top-level folder on first run. To run Vokkit, run the `start.bat` file, or run the command `node index.js` if the operating system is not Windows.
