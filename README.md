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

## Known Bug

- 블럭 이미지 처리 문제: 블럭 모서리에 흰 선이 생깁니다.

## 돌려보고 싶은 분들을 위한 참고사항

월드는 직접 만드셔야 합니다.

worlds 폴더에 텍스트 파일을 하나 만들고, `x,y,z,id` 이렇게 써 내려 가세요.
한 줄당 블럭 하나이며, id 1은 돌, 2는 잔디, 3은 흙입니다. 블럭이 128칸 위에 생성되니 안 보이면 위로 고개를 돌려보세요.

npm install은 최상위 폴더와 public 폴더 두 곳에서 모두 돌려 주세요.
