import { Hono } from 'hono'
import { cors } from 'hono/cors'
import IdGenerator from '../utils/id_generator';

const app = new Hono() 

app.use('*/*', cors());

app.get("/", async ({env, json}) => {
	
		return json('Bienvenu sur nuvel API')
})

app.get('/image/:images', async ({json, env, res, req}) => {
	const image =  req.param('images')
	const bucket = env.storage
	
	const url = req.url
	const hoster = new URL(url).protocol
	console.log(hoster)



	const files = await bucket.get(image)

	if(files === null){
		return json('il y n\'a pas ce fichier')
	}

	const headers = new Headers()
	files.writeHttpMetadata(headers)
	headers.set('etag', files.httpEtag)

	return new Response(files.body, { headers })
})
app.get("/createuser/:name", async ({env, json, res, req}) => {
	const param = req.param('name')
	const listUser = await env.app_users
	const userId = await env.user_id
	console.log(param)

    return json({ville : "yaounde", param})
})

app.post('/image', async ({json, env, res, req, }) => {
	const body = await req.parseBody()
	const headers = req.headers
	const file = body.files
	const id = IdGenerator(15, 5)
	const bucket = env.storage

	const url = req.url
	const protocol = new URL(url).protocol
	const hoster = new URL(url).host

	const path = `${protocol}//${hoster}/image/${id}`

	await bucket.put(id, file, {
		customMetadata : {
			name : file.name,
			size : file.size,
			type : file.type,
			lastModified : file.lastModified,
		},
		httpMetadata : {
			contentType: file.type
		}
	})

	return json({
		path
	})
})

app.get('/user', async ({env, res, req, json}) => {
	return json({
		user : 'vide'
	})
})
app.post('/user', async ({env, res, req, json}) => {
	const data = await req.parseBody()
	const listUser = await env.app_users
	const id = IdGenerator(15, 5)
	
	const user = {
		...data, 
		// image_profil : `/${id}-profils`,
		id,
		interactions : [],
		lu : [], 
		createdAt : new Date()
	}

	await listUser.put(id, JSON.stringify(user))
	const response = await listUser.get(id)

	if(response === null) {return json({ error : 'Echec d\'enregistrement'})}
	else { 
		const JSONPARSE = JSON.parse(value)
		return json(JSONPARSE)
	}
})
app.put('/user/:id', async ({env, res, req, json}) => {
	
})
app.delete('/user/:id', async ({env, res, req, json}) => {
	
})

export default app


