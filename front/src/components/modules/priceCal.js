import dayjs from 'dayjs';

//startDate, endDate는 시작날과 끝날이다. 'YYYY-MM-DD' 형식으로 넣으면 된다.
// 1박의 값만 구할 경우 startDate 에 .add(1,"d") 을 넣어주면 된다.
// 예시
// "2024-01-01"

//성수기 깂인 pops는 roomPriceCal을 실행할 때 넣어주어야 하는 변수값이다.
// 예시
// pops = [{ popStart: '2024-07-01', popEnd: '2024-08-01' },
//          { popStart: '2024-07-01', popEnd: '2024-08-01' },
//          { popStart: '2024-07-01', popEnd: '2024-08-01' },
//      ];

//해당 방의 모든 가격정보를 다음과 같이 변수로 넣어 활용한다.
// 예시
// roomPrices = {
//     weekPop: 120000,
//     weekendPop: 150000,
//     weekUnpop: 100000,
//     weekendUnpop: 130000,
//     more_p: 20000,
//   };
//주중인지 주말인지 성수기인지 비수기인지 확인하는 함수.
//주말은 금~토  와 토~일 을 주말로 설정하였음.
export const seasonType = (day, pops) => {
  let result = {
    day: day.format('YYYY-MM-DD'),
    week: '',
    ispop: 0,
  };
  if (day.get('day') > 4) {
    result.week = 'weekends';
  } else {
    result.week = 'weekdays';
  }
  pops.forEach((pop) => {
    if (dayjs(pop.popStart) <= day && day <= dayjs(pop.popEnd)) {
      result.ispop = 1;
    }
  });

  return result;
};
export function roomPriceCal(startDate, endDate, pops, roomPrices) {
  //seasonType 에서 확인 한 값으로 가격을 내보내는 함수
  const dayPrice = (day) => {
    if ((day.week === 'weekdays')) {
      if (day.ispop) {
        return roomPrices.weekPop;
      } else {
        return roomPrices.weekUnpop;
      }
    } else {
      if (day.ispop) {
        return roomPrices.weekendPop;
      } else {
        return roomPrices.weekendUnpop;
      }
    }
  };
  // 이하 startDate 와 endDate 값 사이 기간동안의 모든 박당 가격을 합산하는 코드

  const start = dayjs(startDate);
  const end = dayjs(endDate);

  const diff = end.diff(start, 'd');
  const days = [];
  for (let index = 0; index < diff; index++) {
    days.push(start.add(index, 'd'));
  }
  const season = days.map((day) => seasonType(day, pops));
  const prices = season.map((day) => dayPrice(day));
  let total = 0;
  prices.forEach((price) => {
    total = total + price;
  });
  // console.log('diff', diff, 'days', days, 'season', season, 'prices', prices);
  return total;
}

//서비스 항목 가격 계산
export function servicePriceCal(iniPrice, addPrice, Qty) {
  let result = 0;
  console.log('Qty', Qty);
  if (Qty) {
    result = iniPrice + addPrice * Qty;
    return result;
  } else {
    return 0;
  }
}
