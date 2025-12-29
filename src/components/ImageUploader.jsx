import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function ImageUploader({ onUploadSuccess , onUploadStart, onUploadEnd }) {
    const [uploading, setUploading] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)

    const uploadImage = async (event) => {
        try {
            setUploading(true);

            // 2. 부모에게 업로드 시작한다는 알림
            if (onUploadStart) onUploadStart();

            if(!event.target.files || event.target.files.length === 0) {
                throw new Error('이미지를 선택해주세요');
            }

            const file = event.target.files[0];
            // 한글 파일명 깨짐 방지를 위해 랜덤 영문 이름 생성
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
            const filePath = `${fileName}`;

            
            // Supabase Storage 에 업로드
            const { error: uploadError } = await supabase.storage
                                                    .from('images')  // Supabase 의 storage 에 만든 bucket 이름
                                                    .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 업로드된 이미지의 공개 주소 가져오기
            const {data} = supabase.storage.from('images').getPublicUrl(filePath);

            setImageUrl(data.publicUrl);

            console.log("이미지 URL : " + imageUrl);

            // 부모 컴포넌트에게 URL 전달(방명록에 같이 저장하기 위해)
            console.log('업로드 성공 URL:', data.publicUrl); // 콘솔 확인용

            if(onUploadSuccess) {
              onUploadSuccess(data.publicUrl);
            }
      
        } catch (error) {
            // 에러 내용을 문자열로 바꿔서 경고창에 띄움
            alert('업로드 실패: ' + JSON.stringify(error, null, 2) + '\n' + error.message);
            console.error('상세 에러:', error);
            console.log(error);
        } finally {
            console.log("finally");
            setUploading(false);
            if(onUploadEnd) onUploadEnd();
        }
    };

      return (
    <div className="mb-4">
      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
        사진 첨부 (선택)
      </label>
      
      <div className="flex items-center gap-4">
        <label className="cursor-pointer bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-500 transition">
          <span className="text-sm">📷 이미지 선택</span>
          <input 
            type="file" 
            accept="image/*" 
            onChange={uploadImage} 
            disabled={uploading}
            className="hidden"
          />
        </label>
        
        {uploading && <span className="text-sm text-blue-500 animate-pulse">업로드 중...</span>}
      </div>

      {imageUrl && (
        <div className="mt-3">
          <img src={imageUrl} alt="Uploaded" className="w-32 h-32 object-cover rounded-lg border-2 border-blue-500" />
        </div>
      )}
    </div>
  );
}