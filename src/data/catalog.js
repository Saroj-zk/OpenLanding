export const PROVIDERS = [
	{
		code: "OA",
		name: "OpenAI"
	},
	{
		code: "AN",
		name: "Anthropic"
	},
	{
		code: "GG",
		name: "Google"
	},
	{
		code: "XA",
		name: "xAI"
	},
	{
		code: "DS",
		name: "DeepSeek"
	},
	{
		code: "MT",
		name: "Meta"
	},
	{
		code: "MS",
		name: "Mistral"
	},
	{
		code: "MO",
		name: "Moonshot AI"
	},
	{
		code: "ZP",
		name: "Zhipu AI"
	},
	{
		code: "NV",
		name: "NVIDIA"
	},
	{
		code: "BF",
		name: "Black Forest Labs"
	},
	{
		code: "SA",
		name: "Stability AI"
	}
];

export const KINDS = [
	{
		id: "text",
		label: "Text"
	},
	{
		id: "image",
		label: "Images"
	},
	{
		id: "video",
		label: "Video"
	},
	{
		id: "audio",
		label: "Audio"
	},
	{
		id: "music",
		label: "Music"
	}
];

export const MODELS = [
	{
		name: "GPT-4o",
		provider: "OpenAI",
		code: "OA",
		kind: "text",
		detail: "128K",
		bestFor: "Everyday reasoning and vision",
		description: "The safe default when you are not sure which model to reach for. Quick, reads images as input, and strong across almost everything."
	},
	{
		name: "o3",
		provider: "OpenAI",
		code: "OA",
		kind: "text",
		detail: "200K",
		bestFor: "Hard maths, proofs, planning",
		description: "Thinks for longer before it answers. Worth the wait on proofs, multi step plans and any problem where a wrong answer is expensive."
	},
	{
		name: "Claude Opus 4",
		provider: "Anthropic",
		code: "AN",
		kind: "text",
		detail: "200K",
		bestFor: "Long documents and drafting",
		description: "The strongest writer in the catalog. Holds a long document in its head, edits carefully, and produces prose that does not read like a machine."
	},
	{
		name: "Claude Sonnet 4",
		provider: "Anthropic",
		code: "AN",
		kind: "text",
		detail: "200K",
		bestFor: "Code review and refactors",
		description: "The balanced daily driver. Reads a large repository, follows instructions closely, and stays quick enough for back and forth work."
	},
	{
		name: "Gemini 2.5 Pro",
		provider: "Google",
		code: "GG",
		kind: "text",
		detail: "1M",
		bestFor: "Whole repositories and video",
		description: "A million token window that also accepts video and audio, so it can watch a recording or read an entire codebase and answer questions about it."
	},
	{
		name: "Grok 4",
		provider: "xAI",
		code: "XA",
		kind: "text",
		detail: "256K",
		bestFor: "Live search and conversation",
		description: "Reaches live sources while it answers, which makes it the one to ask about anything that happened this week."
	},
	{
		name: "GPT-4.1",
		provider: "OpenAI",
		code: "OA",
		kind: "text",
		detail: "1M",
		bestFor: "Very long inputs",
		description: "Takes a million tokens in a single request, so whole document sets and codebases go in at once without chunking."
	},
	{
		name: "o4-mini",
		provider: "OpenAI",
		code: "OA",
		kind: "text",
		detail: "200K",
		bestFor: "Cheap reasoning at volume",
		description: "Most of the reasoning of o3 at a fraction of the cost. Built for batch jobs and agent loops that run all day."
	},
	{
		name: "GPT-4o mini",
		provider: "OpenAI",
		code: "OA",
		kind: "text",
		detail: "128K",
		bestFor: "Fast everyday tasks",
		description: "The cheapest sensible default for classification, extraction and short replies."
	},
	{
		name: "Claude Haiku 4.5",
		provider: "Anthropic",
		code: "AN",
		kind: "text",
		detail: "200K",
		bestFor: "Quick drafts and routing",
		description: "Fast and inexpensive, with enough judgement to triage a queue of work before a larger model picks up what matters."
	},
	{
		name: "Gemini 2.5 Flash",
		provider: "Google",
		code: "GG",
		kind: "text",
		detail: "1M",
		bestFor: "High volume, low latency",
		description: "The same enormous context at a fraction of the latency. Made for pipelines that run at scale."
	},
	{
		name: "Grok 3",
		provider: "xAI",
		code: "XA",
		kind: "text",
		detail: "128K",
		bestFor: "Conversation and search",
		description: "The previous generation, still capable at open conversation and quick research."
	},
	{
		name: "DeepSeek R1",
		provider: "DeepSeek",
		code: "DS",
		kind: "text",
		detail: "128K",
		bestFor: "Maths and coding",
		description: "Open weights model that thinks before it speaks, matching closed frontier models on logic and maths benchmarks."
	},
	{
		name: "DeepSeek V3",
		provider: "DeepSeek",
		code: "DS",
		kind: "text",
		detail: "128K",
		bestFor: "Everyday reasoning",
		description: "Open weights model built for general purpose work, matching closed models on most benchmarks at a fraction of the cost."
	},
	{
		name: "Llama 3.2 400B",
		provider: "Meta",
		code: "MT",
		kind: "text",
		detail: "128K",
		bestFor: "Open weights workloads",
		description: "The largest open weights model available, capable enough to replace closed models for almost any everyday reasoning task."
	},
	{
		name: "Mistral Large",
		provider: "Mistral",
		code: "MS",
		kind: "text",
		detail: "128K",
		bestFor: "Multilingual work",
		description: "Strongest European model, with native fluency in French, Spanish, German, and Italian, and excellent coding capabilities."
	},
	{
		name: "Moonshot-v1",
		provider: "Moonshot AI",
		code: "MO",
		kind: "text",
		detail: "128K",
		bestFor: "Long context",
		description: "Strong Chinese model with excellent long context retrieval and reasoning capabilities."
	},
	{
		name: "GLM-4",
		provider: "Zhipu AI",
		code: "ZP",
		kind: "text",
		detail: "128K",
		bestFor: "General intelligence",
		description: "Leading Chinese model with strong reasoning, coding, and multilingual capabilities."
	},
	{
		name: "Flux.1 Pro",
		provider: "Black Forest Labs",
		code: "BF",
		kind: "image",
		detail: "2048x2048",
		bestFor: "Highest quality images",
		description: "State of the art image generation with excellent text rendering and prompt adherence."
	},
	{
		name: "Midjourney v6",
		provider: "Midjourney",
		code: "MJ",
		kind: "image",
		detail: "2048x2048",
		bestFor: "Aesthetic generation",
		description: "The best model for artistic and photographic generation, with a distinct and highly sought after house style."
	},
	{
		name: "DALL-E 3",
		provider: "OpenAI",
		code: "OA",
		kind: "image",
		detail: "1024x1024",
		bestFor: "Prompt adherence",
		description: "Follows complex prompts exactly and renders legible text. Good for diagrams and specific compositions."
	},
	{
		name: "Stable Diffusion 3",
		provider: "Stability AI",
		code: "SA",
		kind: "image",
		detail: "1024x1024",
		bestFor: "Open weights generation",
		description: "The latest open weights model from Stability, with much improved text rendering and prompt following."
	},
	{
		name: "Sora",
		provider: "OpenAI",
		code: "OA",
		kind: "video",
		detail: "1080p, 60s",
		bestFor: "Realistic video",
		description: "Generates up to a minute of high fidelity video from text, holding subject and background consistency across complex camera moves."
	},
	{
		name: "Gen-3 Alpha",
		provider: "Runway",
		code: "RW",
		kind: "video",
		detail: "1080p, 10s",
		bestFor: "Creative control",
		description: "Excellent temporal consistency and photorealism, with strong controls for camera movement and style."
	},
	{
		name: "Kling 1.5",
		provider: "Kuaishou",
		code: "KS",
		kind: "video",
		detail: "1080p, 10s",
		bestFor: "Character animation",
		description: "Strongest model for generating realistic human movement and expressions."
	},
	{
		name: "Audiobox",
		provider: "Meta",
		code: "MT",
		kind: "audio",
		detail: "Speech & Sound",
		bestFor: "Voice and effects",
		description: "Generates speech and sound effects from text, with fine grained control over voice characteristics."
	},
	{
		name: "ElevenLabs v2",
		provider: "ElevenLabs",
		code: "EL",
		kind: "audio",
		detail: "Speech",
		bestFor: "Realistic voices",
		description: "The most realistic voice generation available, capturing emotion, intonation and pacing."
	},
	{
		name: "Suno v3",
		provider: "Suno",
		code: "SU",
		kind: "music",
		detail: "Music",
		bestFor: "Full tracks",
		description: "Generates complete songs with vocals and instrumentation from a text prompt."
	},
	{
		name: "Udio",
		provider: "Udio",
		code: "UD",
		kind: "music",
		detail: "Music",
		bestFor: "High fidelity music",
		description: "Generates incredibly realistic music with complex instrumentation and clear vocals."
	}
];

export const MODEL_TOTAL = MODELS.length;

export function countByKind(kind) {
	return MODELS.filter((m) => m.kind === kind).length;
}
