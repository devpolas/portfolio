import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CardPropInterface {
  id: number
  cardTitle: string
  firstPart: string
  secondPart: string
}

export default function AboutCard({ content }: { content: CardPropInterface }) {
  return (
    <Card className="rounded-md border transition-all duration-300 hover:-translate-y-1 hover:border-primary">
      <CardHeader>
        <CardTitle>{content.cardTitle}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 leading-relaxed text-muted-foreground">
        <p>{content.firstPart}</p>

        <p>{content.secondPart}</p>
      </CardContent>
    </Card>
  )
}
