import { Schema } from 'mongoose';
import { MemoInterface } from '../interface';

export const memoSchema = new Schema<MemoInterface>({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    memo: {
        type: String,
        required: true,
        unique: false
    },
    // lastModified: {
    //     type: Date,
    //     required: true,
    //     unique: false
    // }
},
    {
        timestamps: true
    });