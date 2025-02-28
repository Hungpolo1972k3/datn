const mongoose = require('mongoose');
const antibioticSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    type:{
        type: String,
        require: true,
        enum: ["Beta-lactam", "Glycopeptide", "Macrolide", "Aminoglycoside", "Fluoroquinolone", "Tetracycline"]
    },
    // Cơ chế tác dụng
    mechanism:{
        type: String,
        require: true,
        enum: ["Ức chế tổng hợp thành tế bào", "Ức chế tổng hợp protein", "Ức chế sao chép và sửa chữa ADN", "Ức chế tổng hợp ARN", "Phá vỡ màng tế bào"]
    },
    //Phổ tác dụng
    spectrum:{
        type: String,
        require: true,
        enum: ["Kháng sinh phổ hẹp (Narrow-spectrum antibiotics)", "Kháng sinh phổ rộng (Broad-spectrum antibiotics)","Kháng sinh phổ siêu rộng (Extended-spectrum antibiotics)"]
    },
    // Các bệnh hoặc triệu chứng thường dùng
    commonUse:{
        type: String,
        require: true
    },
    //Tác dụng phụ
    sideEffect:{
        type: String,
        default: "Không có"
    },
    describe:{
        type: String,
        require: true
    },
    image_url:{
        type: String,
        require: true
    },
    status: {
        type: Boolean,
        default: True
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
});
const Antibiotic = mongoose.model('Microorganism', antibioticSchema);
module.exports = Antibiotic;