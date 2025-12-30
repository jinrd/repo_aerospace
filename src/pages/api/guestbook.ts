// GET 요청을 처리하는 함수

import type { APIRoute } from "astro";
import { Guestbook as GuestbookTable } from "../../db/schema";
import { db } from "../../db";
import { desc } from "drizzle-orm";

// 누군가 /api/guestbok 으로 접속하면 이 함수가 실행된다.
export const GET: APIRoute = async () => {
    try {
        // 1. DB 에서 데이터 가져오기
        const messages = await db
                            .select()
                            .from(GuestbookTable)
                            .orderBy(desc(GuestbookTable.createdAt));

        // 2. JSON 형태로 응답 반환
        return new Response(
            JSON.stringify(
                {
                    success: true,
                    data: messages,
                    count: messages.length
                }
            )
            ,{
                status: 200,
                headers: {
                    'Content-Type' : 'application/json'
                }
            }
        );
    } catch (error){
        console.error('❌ GET Error Details:', error);
        return new Response(JSON.stringify({ error: 'DB 조회 실패' }), { status: 500 });
    }
}

// POST 요청 처리(API 로도 글을 쓸 수 있게)
// Postman 같은 툴로 테스트할 수 있다.
export const POST: APIRoute = async({ request }) => {
    try {

        const body = await request.json(); // JSON 본문을 받음

        console.log("body : " + body);
        if(!body.name || !body.message) {
            return new Response(JSON.stringify({ error: '이름과 메시지가 필요합니다.' }), { status: 400 });
        }

        await db.insert(GuestbookTable).values({
            name: body.name,
            message: body.message,
            imageUrl: body.imageUrl
        })

        console.log("db insert : success" );
        return new Response(JSON.stringify({ success: true, message: '저장 완료!' }), { status: 201 });

    } catch (error: any) {
        return new Response(JSON.stringify({ 
            error: 'Server Error',
            message: error.message, // 에러 메시지
            stack: error.stack      // 에러 위치 (스택 트레이스)
            }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};