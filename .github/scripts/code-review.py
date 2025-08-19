class GeminiCodeReviewer:
    def __init__(self):
        self.api_key = os.environ.get('GEMINI_API_KEY')
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY 환경 변수가 설정되지 않았습니다.")
        
        self.api_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={self.api_key}"
        self.headers = {
            'Content-Type': 'application/json'
        }

def main():
    """메인 함수"""
    try:
        # 명령행 인수에서 파일 목록 가져오기
        filepaths = sys.argv[1:]        
        if not filepaths:
            print("No files to review", file=sys.stderr)
            return
        
        reviewer = GeminiCodeReviewer()
        review_content = reviewer.review_files(filepaths)
        final_review = reviewer.generate_final_review(review_content)
        
        # Base64 인코딩하여 출력 (GitHub Actions에서 사용)
        encoded_review = base64.b64encode(final_review.encode('utf-8')).decode('utf-8')
        print(f"REVIEW_CONTENT={encoded_review}")

