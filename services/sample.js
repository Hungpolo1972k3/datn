const Sample = require('../models/sample');

const createSample = async (user_id, name, strain, header, sequence, length) => {
    try {
        const newSample = new Sample({
            user_id,
            name,
            strain,
            header,
            sequence,
            length,
            status: 1
        });
        const savedSample = await newSample.save();
        return savedSample;
    } catch (error) {
        throw new Error('Lỗi: ' + error.message);
    }
};

const getSampleById = async (sample_id) => {
    try {
        const sample = await Sample.findById(sample_id)
        if(!sample){
            throw new Error('Không tồn tại mẫu thí nghiệm tương ứng');
        }
        return sample;
    } catch (error) {
        throw new Error('Lỗi: ' + error.message);
    }
};


const updateSampleById = async (sample_id, name, strain, header, sequence, length) => {
    try {
        const updatedSample = await Sample.findByIdAndUpdate(
            sample_id,
            {
                name,
                strain,
                header,
                sequence,
                length,
                updated_at: new Date()
            },
            { new: true } 
        );
        if (!updatedSample) {
            throw new Error('Không tìm thấy mẫu thí nghiệm');
        }

        return updatedSample;
    } catch (error) {
        throw new Error('Lỗi khi cập nhật mẫu thí nghiệm: ' + error.message);
    }
};

const getAllSamplesByUserId = async (user_id) => {
    try {
        const samples = await Sample.find({user_id: user_id})
        if(!samples || samples.length > 0){
            throw new Error('Không tồn tại mẫu thí nghiệm tương ứng');
        }
        return samples;
    } catch (error) {
        throw new Error('Lỗi: ' + error.message);
    }
};
module.exports = { createSample, getSampleById, updateSampleById, getAllSamplesByUserId};
