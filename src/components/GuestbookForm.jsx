import { useState } from "react";
import ImageUploader from "./ImageUploader";


export default function GuestbookForm() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');   
    const [finalImageUrl, setFinalImageUrl] = useState('');

    // 이미지 업로드 중인지 체크하는 상태 추가
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setIsSubmitting(true);
        console.log('api 요청 전 finalImageUrl : ', finalImageUrl );
        try {
            // DB 에 저장될 정보를 API 서버로 데이터 전송(quest 5 에서 만든 API 재활용)
            const response = await fetch('/api/guestbook', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    name: name,
                    message: message,
                    imageUrl: finalImageUrl // 이미지 주소도 같이 보낸다.
                }),
            });

            if(!response.ok) throw new Error("저장 실패");

            // 2. 성공 시 초기화 & 새로고침
            alert('방명록 등록 완료! 🎉');
            window.location.reload(); // 목록 갱신을 위해 새로고침

        } catch(error) {
            alert(error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 mb-10">
        <div className="mb-4">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">이름</label>
            <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
            className="w-full border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 p-3 rounded-lg dark:text-white" 
            />
        </div>

        <div className="mb-4">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">메시지</label>
            <textarea 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required 
            className="w-full border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 p-3 rounded-lg h-24 dark:text-white"
            ></textarea>
        </div>

        {/* 👇 여기서 이미지 업로더 사용! */}
        <div className="mb-6">
            {/* ImageUploader 내부에서 이미지를 올리면 setUploadedImageUrl을 통해 주소를 받아옴 */}
            {/* 주의: 아까 ImageUploader를 'Store' 방식으로 바꿨다면 Store에서 가져와야 하지만, */}
            {/* 가장 쉬운 건 ImageUploader에서 onUploadComplete를 다시 살려서 쓰는 겁니다. */}
            {/* 지금은 간단하게 'Store' 방식이나 'props' 방식 중 편한 걸 쓰세요. */}
            {/* 여기선 일단 ImageUploader만 렌더링하고, 이미지가 올라갔다고 가정합니다. */}
            {/* (실제로는 ImageUploader 내부에서 부모에게 URL을 주는 로직이 필요합니다) */}
            
            {/* 팁: ImageUploader 컴포넌트 내부에 `uploadedImageUrl` 스토어를 쓰고 있다면 여기서도 쓰면 됩니다. */}
            <ImageUploader 
            onUploadSuccess={(url) => {
                console.log("부모가 받은 URL : " , url); // 확인용
                setFinalImageUrl(url); // 부모 상태에 저장!
            }}
            onUploadStart={() => setIsImageUploading(true)}
            onUploadEnd={() => setIsImageUploading(false)}/>
        </div>

        <button 
            type="submit" 
            disabled={isSubmitting || isImageUploading}
            className={`w-full font-bold py-3 rounded-lg transition-colors 
            ${(isSubmitting || isImageUploading) 
                ? 'bg-slate-400 cursor-not-allowed' // 비활성화 스타일
                : 'bg-blue-600 hover:bg-blue-700 text-white' // 활성화 스타일
            }`}
        >
        {isImageUploading ? '사진 업로드 중... ⏳' : 
         isSubmitting ? '저장 중...' : '✨ 등록하기'}
        </button>
        </form>
    );

}