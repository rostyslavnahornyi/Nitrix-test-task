import mongoose from "mongoose";

const taskScheme = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.model('Task', taskScheme);