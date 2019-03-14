const Sequelize = require("sequelize")

// 建立连接
const sequelize = new Sequelize("test", "root", "yh5204170", {
    host: "localhost",
    dialect: "mysql",
    operatorsAliases: false
});

// // 1.定义模型 Model-Table
// const Fruit = sequelize.define('fruit', {
//     name: {
//         type: Sequelize.STRING(20),
//         get() {
//             const name = this.getDataValue('name'),
//                 price = this.getDataValue('price');
//             return `${name} - ¥${price}`
//         }
//     },
//     price: {
//         type: Sequelize.FLOAT,
//         allowNull: false,
//         validate: {
//             isFloat: {
//                 msg: '价格必须为数字'
//             },
//             min: {
//                 args: [0],
//                 msg: '价格不能为负数'
//             },

//         }
//     },
//     stock: {
//         type: Sequelize.INTEGER,
//         defaultValue: 0
//     }
// }, {
//     timestamps: false,
//     getterMethods: {
//         amount() {
//             return this.getDataValue('stock') + 'kg'
//         }
//     },
//     setterMethods: {
//         amount(val) {
//             const index = val.indexOf('kg');
//             const v = val.slice(0, index);
//             this.setDataValue('stock', v)
//         }
//     },
// })
// // 3. 模型扩展
// Fruit.classify = function (name) {
//     const tropicFruits = ['香蕉', '芒果'];
//     return tropicFruits.includes(name) ? '热带水果' : '其它水果';
// }
// const fArr = ['草莓', '芒果'];
// fArr.forEach(f => {
//     console.log(Fruit.classify(f)); // 模型扩展 调用

// });
// // 4. 实例扩展 仅能由查询语句查出的结果实例来调用
// Fruit.prototype.totalPrice = function (count) {
//     return this.price * count
// }

// // 2.同步
// Fruit.sync({
//         force: true
//     })
//     .then(() => {
//         return Fruit.create({
//             name: 'banana',
//             price: 3
//         });
//     })
//     .then(() => {
//         // 查询
//         Fruit.findAll().then(fruits => {
//             // console.log(JSON.stringify(fruits));

//             // 更新实例
//             // 方法1
//             fruits[0].amount = '150kg';
//             fruits[0].save();
//             console.log(fruits[0].totalPrice(5)); // 实例扩展 调用  
//             // 方法2
//             Fruit.update({
//                 price: 4
//             }, {
//                 where: {
//                     id: 1
//                 }
//             })

//             // 数据查询
//             // id
//             Fruit.findById(1).then(fruit => {
//                 console.log(fruit.get()); // 使用.get()方法来转换为js显示对象
//             })

//             // 条件查询
//             Fruit.findOne({
//                 where: {
//                     name: 'banana'
//                 }
//             }).then(fruit => {
//                 console.log(fruit.get()); // 使用.get()方法来转换为js可视化对象，数据模型
//             })

//             // // 复杂条件查询  —— 查询操作符
//             const Op = Sequelize.Op;
//             Fruit.findAll({
//                 where: {
//                     price: {
//                         [Op.lt]: 5
//                     }
//                 }
//             }).then(fruits => {
//                 console.log(fruits[0].get());
//             })

//             // 删除
//             // Fruit.destroy({
//             //     where: {
//             //         price: {
//             //             [Op.lt]: 5
//             //         }
//             //     }
//             // })
//         })
//     }).catch(err => {
//         console.log(err);
//     })


// const Player = sequelize.define('player', {
//     name: Sequelize.STRING
// })
// const Team = sequelize.define('team', {
//     name: Sequelize.STRING
// })

// Player.belongsTo(Team); // 1->N
// Team.hasMany(Player); // N->1

// sequelize.sync({
//     force: true
// }).then(async () => {
//     await Team.create({
//         name: '火箭'
//     })
//     await Player.bulkCreate([{
//         name: '哈登',
//         teamId: 1
//     }, {
//         name: '保罗',
//         teamId: 1
//     }]);

//     // 1端查询  带N
//     const players = await Player.findAll({
//         include: [Team]
//     })
//     console.log(JSON.stringify(players, null, '\t'));

//     // N端查询  带1
//     const team = await Team.findOne({
//         where: {
//             name: '火箭'
//         },
//         include: [Player]
//     })
//     console.log(JSON.stringify(team, null, '\t'));
// })


// 多对多
const Fruit = sequelize.define("fruit", {
    name: Sequelize.STRING
})
const Category = sequelize.define("category", {
    name: Sequelize.STRING
})

// 多对多必须要简历关联关系表
Fruit.FruitCategory = Fruit.belongsToMany(Category, {
    through: "FruitCategory"
})
sequelize.sync({
    force: true
}).then(async () => {
    await Fruit.create({
        name: '香蕉',
        // 建一张表数据同时建立其关联表数据
        categories: [{
            id: 1,
            name: '热带'
        }, {
            id: 2,
            name: '温带'
        }],
    }, {
        // 建一张表数据同时建立其关系表数据
        include: [Fruit.FruitCategory]
    })

    const fruit = await Fruit.findOne({
        where: {
            name: '香蕉'
        },
        include: [{
            model: Category,
            through: {
                attributes: ['id', 'name']
            }
        }]
    })
    console.log(JSON.stringify(fruit, null, '\t'));

})