import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CardPropInterface {
  id: number
  cardTitle: string
  firstPart: string
  secondPart: string
}

export default function AboutCard({ content }: { content: CardPropInterface }) {
  return (
    <Card className="border hover:border-primary rounded-md transition-all hover:-translate-y-1 duration-300">
      <CardHeader>
        <CardTitle className="font-semibold text-lg md:text-xl">
          {content.cardTitle}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 text-muted-foreground leading-relaxed">
        <p>{content.firstPart}</p>

        <p>{content.secondPart}</p>
      </CardContent>
    </Card>
  )
}
