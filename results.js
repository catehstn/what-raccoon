const raccoonData = {
    liquor: {
        name: "Drunk Liquor Store Raccoon",
        subtitle: "The Burnt Out Self-Saboteur",
        iconic: "In 2025, <a href='https://www.independent.co.uk/news/world/americas/raccoon-virginia-drunk-liquor-store-b2876835.html' target='_blank'>a raccoon broke into a liquor store in Virginia</a>, drank scotch and whiskey, and passed out on the floor of the bathroom. Animal control found him completely zonked, and took him away to sleep it off before releasing him back into the wild. Sometimes you just need to check out.",
        inTech: "You've hit your limit. The \"do more with less\" mandates, the layoffs, the sprints that never end—it's all been too much. You're surviving on spite and cold brew, and honestly? You're self-sabotaging a little. Missing deadlines, phoning in PRs, \"forgetting\" meetings. Part of you knows you need rest, but part of you is just... letting things fall apart. You're the drunk raccoon in the whiskey aisle, and you need someone to gently escort you to recovery. Take the PTO. Touch grass. You can't keep going like this."
    },
    mpr: {
        name: "MPR Raccoon",
        subtitle: "The Overcommitted",
        iconic: "In 2018, <a href='https://www.bbc.com/news/world-us-canada-44465587' target='_blank'>a raccoon climbed to the 23rd floor of a building in St. Paul, Minnesota, transfixing the entire internet</a>. #MPRRaccoon trended as people watched it scale higher and higher, terrified it would fall. It made it to the roof safely, but for hours, it was just... stuck up there, too high to come down.",
        inTech: "You said yes to too many things and now you're clinging to the side of a skyscraper. 20+ direct reports. Multiple huge projects. You keep climbing—more people, more responsibility, bigger scope—but there's no solid ground. You care deeply, you can't say no, and now you're drowning in commitments. Everyone's watching, nervous for you, but you just have to keep climbing. You're competent enough to survive this, but you're also genuinely stuck. Someone needs to throw you a ladder (or you need to learn to say \"no\")."
    },
    conrad: {
        name: "Conrad (Dead Toronto Raccoon)",
        subtitle: "The Martyr / Cautionary Tale",
        iconic: "In 2015, <a href='https://www.buzzfeed.com/craigsilverman/the-definitive-oral-history-of-deadraccoonto' target='_blank'>a dead raccoon lay on a Toronto sidewalk for 12 hours</a>. Once the raccoon had been there for several hours with no action from the city, some local tech workers started a memorial with flowers, and a framed picture. The raccoon—later named Conrad—became a symbol of bureaucratic failure and civic neglect. People mourned what the city ignored.",
        inTech: "You kept the legacy system running. You wrote documentation no one read. You flagged the technical debt for years. And nobody noticed—until you left. Then suddenly it was postmortems, incident reports, and \"wow, they were holding everything together.\" You're Conrad: appreciated only in departure. Your work was excellent, your warnings were prescient, but the organization couldn't see your value until you were gone. You're the cautionary tale, the symbol of what happens when companies don't invest in maintenance. They'll put flowers on your metaphorical grave and learn nothing."
    },
    rebecca: {
        name: "Rebecca (White House Raccoon)",
        subtitle: "The Misplaced Fancy",
        iconic: "In the 1920s, President Coolidge and First Lady Grace <a href='https://en.wikipedia.org/wiki/Rebecca_(raccoon)' target='_blank'>kept a raccoon named Rebecca as a pet in the White House</a>. She was meant to be Thanksgiving dinner but became a beloved (if chaotic) fixture of the most powerful residence in America. A raccoon. In the White House.",
        inTech: "You're in a fancy place you're not supposed to be, and you can't shake the feeling that someone's going to figure it out. You got the offer, but you feel like a fraud. Everyone around you seems to know what they're doing, and you're just... performing \"senior engineer\" while internally screaming. You're Rebecca: charming, capable, but perpetually aware you're a raccoon in the White House. The imposter syndrome is real, but also—you're still here. Maybe you belong more than you think."
    },
    melanie: {
        name: "Instagram Raccoon - Trike Riding Melanie / Painting Piper",
        subtitle: "The Performer",
        iconic: "Melanie the raccoon rides a tiny tricycle. Piper the raccoon paints abstract art. Both are trained, performing raccoons who became viral sensations. They're talented, they're adorable, and they're doing it for an audience.",
        inTech: "Your GitHub contribution graph is *pristine*. You've got three side projects, you're active on socials, and you're giving conference talks. You're building in public, shipping constantly, hustling visibly. But here's the question: is it for you, or is it for the algorithm? The line between genuine passion and performance has blurred. You're Melanie on her trike, Piper with her paintbrush—talented, yes, but performing. The work has become content. The learning has become the personal brand. It's exhausting, you might be burnt out, but the green squares must stay green. The hustle is the identity now."
    },
    toronto: {
        name: "Toronto Raccoon",
        subtitle: "The Unkillable",
        iconic: "Toronto raccoons are *legendary*. They've defeated every \"raccoon-proof\" garbage bin the city designed. They're clever, adaptable, unstoppable. The city tries to outsmart them; the raccoons just learn faster. They thrive in an environment actively hostile to their existence.",
        inTech: "You're unkillable. Hiring freezes, layoffs, RTO mandates—none of it stops you. When faced with an obstacle or pointless bureaucracy, you find - or build - a workaround. You're constantly learning, not for clout but because it's *useful*. New language? You'll pick it up. Legacy system no one understands? You'll reverse-engineer it. You're three steps ahead of middle management, too valuable to cut, too clever to constrain. The bureaucrats keep trying to stop you, and you keep thriving anyway. You're the Toronto raccoon: pragmatic, resilient, impossible to defeat. You're not here to perform—you're here to *solve problems*. And spite is a powerful motivator."
    },
    stuck: {
        name: "Stuck Raccoon",
        subtitle: "The Compromised",
        iconic: "Raccoons have a talent for getting stuck in places they shouldn't have gone. Whether it's a chubby raccoon wedged in a sewer grate in Massachusetts or one trapped in a tank, these images are both pitiful and darkly funny. They got themselves into this mess, and now they need someone to rescue them. Everyone can see them stuck there, and it's kind of embarrassing.",
        inTech: "You're trapped in a situation that violates your values, and you know it. Maybe it's defense tech, adtech, surveillance capitalism, AI that displaces workers, crypto scams, or just a company actively making the world worse. The pay is good. The stock vests. The benefits are incredible. But you're complicit, and the cognitive dissonance is crushing. You tell yourself you'll leave after the next vest cliff, after you pay off loans, after you save enough. But you won't. You're the raccoon stuck in the sewer grate—you got yourself into this, everyone can see you're trapped, and you need external intervention to get out. The golden handcuffs are real, and they're tight. You're not thriving, you're not even surviving—you're just stuck."
    },
    alligator: {
        name: "Alligator-Riding Raccoon",
        subtitle: "The Precarious Opportunist",
        iconic: "In 2015, <a href='https://abc7.com/post/raccoon-jumps-on-alligator-for-once-in-a-lifetime-photo/784869/' target='_blank'>a photograph emerged of a raccoon riding on the back of an alligator in Florida</a>. It should not work. The alligator should eat the raccoon. But there it is—a raccoon, surfing an apex predator, through sheer audacity and opportunism. It's precarious, it's absurd, and it's working. For now.",
        inTech: "Capitalism wants to eat you, but you've figured out how to ride it. You're a contractor making 2x salary with zero benefits. You're a consultant exploiting the \"efficiency era\" chaos. You're riding startup equity lottery tickets. You're surfing the AI hype wave while knowing it's probably a bubble. You're not trying to fix the system or fight it—you're exploiting its inefficiencies for your own gain. It's working. *For now.* One wrong move and you're lunch. One market shift, one contract ending, one alligator turning its head—and it's over. But what a ride. You're not secure, you're not stable, but you're making it work through pure audacity and opportunism. You're the raccoon on the alligator: precarious, unhinged, and somehow still afloat."
    }
};
