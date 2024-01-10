const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    answerText: {
        type: String,
        required: true,
    },
    images: {
        type: Array,
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        fullname: {
            type: String,
            required: true,
        },
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
    },
    isAccepted: {
        type: Boolean,
        default: false,
    },
    countUpvotes: {
        type: Number,
        default: 0,
    },
    countDownvotes: {
        type: Number,
        default: 0,
    },
    countComments: {
        type: Number,
        default: 0,
    },
    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            commentText: {
                type: String,
                required: true,
            },
        },
    ],
    // Array to store users who upvoted
    upvotes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],

    // Array to store users who downvoted
    downvotes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});

// Function to handle upvoting an answer
answerSchema.methods.upVote = async function (userId) {
    if (!this.upvotes.includes(userId)) {
        this.upvotes.push(userId);
        this.countUpvotes += 1;

        // If the user has previously downvoted, remove the downvote
        if (this.downvotes.includes(userId)) {
            this.downvotes = this.downvotes.filter(
                (id) => id.toString() !== userId.toString()
            );
            if (this.countDownvotes > 0) {
                this.countDownvotes -= 1;
            }
        }

        await this.save();
        return this;
    } else {
        this.upvotes = this.upvotes.filter(
            (id) => id.toString() !== userId.toString()
        );
        if (this.countUpvotes > 0) {
            this.countUpvotes -= 1;
        }
        await this.save();
        return this;
    }
};

// Function to handle downvoting an answer
answerSchema.methods.downVote = async function (userId) {
    if (!this.downvotes.includes(userId)) {
        this.downvotes.push(userId);
        this.countDownvotes += 1;

        // If the user has previously upvoted, remove the upvote
        if (this.upvotes.includes(userId)) {
            this.upvotes = this.upvotes.filter(
                (id) => id.toString() !== userId.toString()
            );
            if (this.countUpvotes > 0) {
                this.countUpvotes -= 1;
            }
        }

        await this.save();
        return this;
    } else {
        this.downvotes = this.downvotes.filter(
            (id) => id.toString() !== userId.toString()
        );
        if (this.countDownvotes > 0) {
            this.countDownvotes -= 1;
        }
        await this.save();
        return this;
    }
};

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;
