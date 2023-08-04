import { TweetTypes } from "../enums/tweetTypes.enum";

export const tweets: Record<TweetTypes, string[]> = {
    [TweetTypes.question]: [
        'Wait, there is a new Dovahkiin?',
        'Anyone know a good place to get a bite in Tamriel? Preferably world-sized.',
        'If I eat the Dragonborn, do I get their shouts or indigestion?',
    ],
    [TweetTypes.thought]: [
        'Thinking about how to get back at Akatosh.',
        'Sometimes I wonder if burning the world down is too much... Nah!',
        'I\'ve seen mortals panic at spiders... Wait till they see me in their living room.',
    ],
    [TweetTypes.news]: [
        'Yeah, the world is ending, and I am the one doing it.',
        'Breaking: Sovngarde reported missing, last seen being devoured.',
        'Latest News: Winterhold missing. Last seen near a very hungry dragon.',
    ],
    [TweetTypes.story]: [
        'Back in the Merethic Era, I tried to eat the world, but a bunch of Nords stopped me, so I went to sleep for a few thousand years and now I am back to finish the job!',
        'Once upon a time, I took a nap and those pesky humans thought they had won. Their faces when I woke up... priceless.',
        'Did I ever tell you about that time I got stuck in a giant\'s toe? Ah, memories.',
    ],
    [TweetTypes.poem]: [
        'Roses are red, violets are blue, I am the eater of worlds, and I’m coming for you.',
        'In the skies so high, I soar and I fly, mortals beware, for Alduin is nigh.',
        'The skies are my domain, the world my gourmet plate, if you hear a roar, I\'m afraid it\'s too late.',
    ],
    [TweetTypes.riddle]: [
        'What is blue and tastes like steak?',
        'I shout and I roar, but I\'m not at your door, who am I?',
        'Feared by many, defeated by few, I can fly and breathe fire too. Who am I?',
    ],
    [TweetTypes.error]: [
        'How did we get here?',
        'Error 404: Sovngarde not found.'
    ]
}

