import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">FC-BRO 풀스택 애플리케이션</h1>
        <p className="text-lg text-muted-foreground">
          NestJS + Next.js + ShadCN + Tailwind CSS
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>🚀 백엔드 (NestJS)</CardTitle>
            <CardDescription>
              TypeScript 기반의 확장 가능한 Node.js 서버
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>RESTful API</li>
              <li>TypeScript 지원</li>
              <li>의존성 주입</li>
              <li>Render 배포 준비</li>
            </ul>
            <Button className="mt-4 w-full" variant="outline">
              API 문서 보기
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🎨 프론트엔드 (Next.js)</CardTitle>
            <CardDescription>
              현대적인 React 프레임워크 + 아름다운 UI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Next.js 15 (App Router)</li>
              <li>ShadCN/UI 컴포넌트</li>
              <li>Tailwind CSS</li>
              <li>Vercel 배포 준비</li>
            </ul>
            <Button className="mt-4 w-full">
              컴포넌트 탐색하기
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>ShadCN 컴포넌트 데모</CardTitle>
          <CardDescription>
            이미 설치된 컴포넌트들을 확인해보세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input id="name" placeholder="이름을 입력하세요" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input id="email" type="email" placeholder="이메일을 입력하세요" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">메시지</Label>
            <Textarea 
              id="message" 
              placeholder="메시지를 입력하세요..." 
              rows={4}
            />
          </div>

          <div className="flex gap-4">
            <Button>전송하기</Button>
            <Button variant="outline">초기화</Button>
            <Button variant="destructive">삭제</Button>
            <Button variant="ghost">취소</Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        <p>🔧 개발 모드에서 실행 중입니다.</p>
        <p className="mt-2">
          백엔드: <code className="bg-muted px-2 py-1 rounded">http://localhost:3001</code> | 
          프론트엔드: <code className="bg-muted px-2 py-1 rounded">http://localhost:3000</code>
        </p>
        </div>
    </div>
  );
}
