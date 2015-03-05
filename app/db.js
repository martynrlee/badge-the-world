var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var Pledge = new Schema({
    createBadge		: Boolean,
    issueBadge		: Boolean,
    displayBadge	: Boolean,
    researchBadge	: Boolean,
    joinBadge		: Boolean,
    idea    		: String,
    numberOfPeople	: Number,
    location		: String,
    postcode		: String,
    email			: String,
    name			: String,
    twitterHandle	: String,
    organisation	: String,
    shareCaseStyudy	: Boolean,
    shareOB			: Boolean,
    subscribe		: Boolean,
    created_at 		: Date
});

mongoose.model( 'Pledge', Pledge );
mongoose.connect( 'mongodb://localhost/badge-the-world' );