var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var TopicSchema = new Schema({
  type: { type: String },
  master_id: { type: ObjectId, index: true },
  author_id: { type: ObjectId },
  topic_id: { type: ObjectId },
  has_read: { type: Boolean, default: false },
  create_at: { type: Date, default: Date.now }
});

mongoose.model('Topic', TopicSchema);