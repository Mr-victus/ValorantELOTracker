from django.shortcuts import render
from django.http import HttpResponse
import re
import aiohttp
import asyncio
import json
from django.http import JsonResponse
async def run(username, password ,region):
    session = aiohttp.ClientSession()
    data = {
        'client_id': 'play-valorant-web-prod',
        'nonce': '1',
        'redirect_uri': 'https://beta.playvalorant.com/opt_in',
        'response_type': 'token id_token',
    }
    data = await session.post('https://auth.riotgames.com/api/v1/authorization', json=data)
    
    
    data = {
        'type': 'auth',
        'username': username,
        'password': password
    }
    async with session.put('https://auth.riotgames.com/api/v1/authorization', json=data) as r:
        data = await r.json()
    pattern = re.compile('access_token=((?:[a-zA-Z]|\d|\.|-|_)*).*id_token=((?:[a-zA-Z]|\d|\.|-|_)*).*expires_in=(\d*)')
    data = pattern.findall(data['response']['parameters']['uri'])[0]
    access_token = data[0]
    print('Access Token: ' + access_token)
    
    id_token = data[1]
    expires_in = data[2]

    headers = {
        'Authorization': f'Bearer {access_token}',
    }
    async with session.post('https://entitlements.auth.riotgames.com/api/token/v1', headers=headers, json={}) as r:
        data = await r.json()
    entitlements_token = data['entitlements_token']
    print('Entitlements Token: ' + entitlements_token)
    
    async with session.post('https://auth.riotgames.com/userinfo', headers=headers, json={}) as r:
        data = await r.json()
    user_id = data['sub']
    print('User ID: ' + user_id)
    
    headers['X-Riot-Entitlements-JWT'] = entitlements_token
    
    # Example Request. (Access Token and Entitlements Token needs to be included!)
    async with session.get(f'https://pd.'+region+'.a.pvp.net/mmr/v1/players/'+user_id+'/competitiveupdates?startIndex=0&endIndex=20', headers=headers) as r:
        data = json.loads(await r.text())
    print(data)

    await session.close()
    return access_token , entitlements_token , user_id , data


# Create your views here.
def Login(request):
    username = request.GET['userName']
    password = request.GET['password']
    region = request.GET['region']
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    async_result= loop.run_until_complete(run(username, password ,region))
    loop.close()
    print(type(async_result))
    return JsonResponse({'Access_Token':async_result[0],'EntitlementToken':async_result[1],'UserID':async_result[2],'data':async_result[3]})

def compiHistoryView(request):
    
    return JsonResponse({'Access_Token':'Hello'})