import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, XCircle, Eye, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Admin() {
  const { toast } = useToast();
  const [selectedContribution, setSelectedContribution] = useState<any>(null);
  const [reviewComment, setReviewComment] = useState("");

  const mockContributions = [
    {
      id: "1",
      type: "lesson",
      status: "pending",
      contributorUsername: "TeacherTom",
      data: {
        title: "Weather Vocabulary",
        description: "Learn words to describe weather conditions",
        difficulty: "Medium",
        trackName: "Basics",
        questionCount: 8,
      },
      createdAt: "2025-01-20T14:30:00Z",
    },
    {
      id: "2",
      type: "track",
      status: "pending",
      contributorUsername: "LinguaLearner",
      data: {
        name: "Business Spanish",
        description: "Professional vocabulary and phrases for business settings",
        language: "Spanish",
      },
      createdAt: "2025-01-20T10:15:00Z",
    },
    {
      id: "3",
      type: "lesson",
      status: "approved",
      contributorUsername: "PolyglotPete",
      data: {
        title: "Shopping Essentials",
        description: "Essential phrases for shopping and bargaining",
        difficulty: "Easy",
        trackName: "Travel",
        questionCount: 6,
      },
      createdAt: "2025-01-19T16:20:00Z",
      reviewedAt: "2025-01-20T09:00:00Z",
      reviewerComment: "Excellent content! Approved.",
    },
  ];

  const handleApprove = (id: string) => {
    toast({
      title: "Contribution Approved",
      description: "The contribution has been approved and is now live.",
    });
    setSelectedContribution(null);
    setReviewComment("");
  };

  const handleReject = (id: string) => {
    if (!reviewComment) {
      toast({
        title: "Comment Required",
        description: "Please provide a reason for rejection.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Contribution Rejected",
      description: "The contributor has been notified.",
    });
    setSelectedContribution(null);
    setReviewComment("");
  };

  const pendingContributions = mockContributions.filter(c => c.status === "pending");
  const reviewedContributions = mockContributions.filter(c => c.status !== "pending");

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-lg text-muted-foreground">
          Review and manage community contributions
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Pending Review</p>
              <p className="text-2xl font-bold text-warning" data-testid="stat-pending">
                {pendingContributions.length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Approved Today</p>
              <p className="text-2xl font-bold text-success" data-testid="stat-approved">
                {mockContributions.filter(c => c.status === "approved").length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Contributors</p>
              <p className="text-2xl font-bold" data-testid="stat-contributors">
                {new Set(mockContributions.map(c => c.contributorUsername)).size}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending" data-testid="tab-pending">
            Pending ({pendingContributions.length})
          </TabsTrigger>
          <TabsTrigger value="reviewed" data-testid="tab-reviewed">
            Reviewed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingContributions.map((contribution) => (
            <Card key={contribution.id} data-testid={`contribution-${contribution.id}`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle>
                        {contribution.type === "lesson"
                          ? contribution.data.title
                          : contribution.data.name}
                      </CardTitle>
                      <Badge variant="outline" className="capitalize">
                        {contribution.type}
                      </Badge>
                      <Badge variant="outline" className="bg-warning/10 text-warning">
                        Pending
                      </Badge>
                    </div>
                    <CardDescription className="mt-2">
                      Submitted by {contribution.contributorUsername} •{" "}
                      {new Date(contribution.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {contribution.data.description}
                  </p>
                  {contribution.type === "lesson" && (
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">
                        Track: {contribution.data.trackName}
                      </Badge>
                      <Badge variant="outline">
                        {contribution.data.difficulty}
                      </Badge>
                      <Badge variant="outline">
                        {contribution.data.questionCount} questions
                      </Badge>
                    </div>
                  )}
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedContribution(contribution)}
                      data-testid="button-review"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Review
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Review Contribution</DialogTitle>
                      <DialogDescription>
                        Review and provide feedback for this contribution
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <h3 className="mb-2 font-semibold">
                          {contribution.type === "lesson"
                            ? contribution.data.title
                            : contribution.data.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {contribution.data.description}
                        </p>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Review Comment (optional for approval, required for rejection)
                        </label>
                        <Textarea
                          placeholder="Add feedback for the contributor..."
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          data-testid="input-review-comment"
                        />
                      </div>
                    </div>
                    <DialogFooter className="gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handleReject(contribution.id)}
                        data-testid="button-reject"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                      <Button
                        onClick={() => handleApprove(contribution.id)}
                        data-testid="button-approve"
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Approve
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}

          {pendingContributions.length === 0 && (
            <Card>
              <CardContent className="flex min-h-64 items-center justify-center">
                <p className="text-muted-foreground">No pending contributions</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="reviewed" className="space-y-4">
          {reviewedContributions.map((contribution) => (
            <Card key={contribution.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle>
                        {contribution.type === "lesson"
                          ? contribution.data.title
                          : contribution.data.name}
                      </CardTitle>
                      <Badge variant="outline" className="capitalize">
                        {contribution.type}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          contribution.status === "approved"
                            ? "bg-success/10 text-success"
                            : "bg-destructive/10 text-destructive"
                        }
                      >
                        {contribution.status}
                      </Badge>
                    </div>
                    <CardDescription className="mt-2">
                      Submitted by {contribution.contributorUsername} •
                      Reviewed {new Date(contribution.reviewedAt || "").toLocaleDateString()}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              {contribution.reviewerComment && (
                <CardContent>
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-sm">
                      <span className="font-medium">Admin comment:</span>{" "}
                      {contribution.reviewerComment}
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
