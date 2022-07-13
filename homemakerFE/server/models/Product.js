const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = mongoose.Schema({
    writer :{
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    title : {
        type : String,
        maxlength : 50
    },
    description : {
        type : String,
    },
    price : {
        type : Number,
        default : 0
    },
    images : {
        type : Array,
        default: []
    },
    sold : {
        type : Number,
        maxlength : 100,
        defalult : 0
    },

    continents: {
        type : Number,
        default : 1
    },
    views : {
        type : Number,
        default: 0
    }

}, {timestamps : true })

productSchema.index({
    title : 'text',
    description : 'text'
}, {
    //title, description중 어디에 얼마만큼 비중을 둘것? 밑에는 타이틀에 다섯배더 비중을 두겠다~ 그런뜻
    weight:{

        title : 5,
        description : 1
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }