import TbkService from './lib';

new TbkService(
  '7c1ea1d232cb44a9813c159e9b9e288c',
  '70ac7cc4f5ad4871a71260b7f6802daf'
)
  .request('jd.union.open.promotion.bysubunionid.get', {
    promotionCodeReq: {
      positionId: 1330373826,
      chainType: 2,
      sceneId: 1,
      materialId: 'https://u.jd.com/zgESKx4',
    },
  })
  .then((r) => {
    console.log(r);
  });
