# 출처
* [위키피디아 - 옵저버 패턴](https://ko.wikipedia.org/wiki/%EC%98%B5%EC%84%9C%EB%B2%84_%ED%8C%A8%ED%84%B4)

# 옵저버 패턴이란?
* 상태를 관리하는 Subject와 상태 변화를 관찰하는 Observer들로 이루어져 있음
* Observer의 목록을 Subject에 등록하여 상태 변화가 있을 때마다 메서드 등을 통해 Subject의 Observer 목록에 등록되어 있는 Observer에게 통지하는 패턴
* 분산 이벤트 핸들링 시스템 구현에 자주 사용됨

# 옵저버 패턴의 구현
![img](/state-web-component/2-state-management/2-1-observer-pattern/md-img/observerPattern.png)
* Observer(Listener)를 Subject에 등록
  * Subject는 이벤트(상태)를 정의 및 관리
  * Subject는 NotifyObservers를 통해 Notify 함수를 호출
  * Subject는 등록, 제거 메서드를 통해 Observer를 관리
* Observer들은 Subject가 발생시키는 이벤트(상태 변화)를 받아 처리함
  * Observer들은 Notify함수를 통해 이벤트 발생시 동작을 정의함
  * 정의된 Notify함수는 Subject에서 호출되는 것이 일반적 -> 변형 가능함
* 유의할 점: 이벤트 순환 실행을 막는 메커니즘 필요
  
# 대표적인 사례
* 이벤트 기반 프로그래밍
* 모델-뷰-컨트롤러 패러다임과 자주 결함
  * 모델에서 일어나는 이벤트를 통보 받은 옵저버는 뷰를 바꾸는 스위치를 작동시킴