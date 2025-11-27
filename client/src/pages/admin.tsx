import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, XCircle, Eye, Plus, BookPlus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useCurrentUser } from "@/lib/user-context";
import type { Contribution } from "@shared/schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateLessonDialog } from "@/components/create-lesson-dialog";
import { EditContributionDialog } from "@/components/edit-contribution-dialog";

export default function Admin() {
  const { toast } = useToast();
  const { user } = useCurrentUser();
  const [selectedContribution, setSelectedContribution] = useState<Contribution | null>(null);
  const [reviewComment, setReviewComment] = useState("");

  // Fetch all contributions
  const { data: contributions = [], isLoading } = useQuery<Contribution[]>({
    queryKey: ["/api/contributions"],
    enabled: !!user?.isAdmin,
  });

  // Approve/reject mutation
  const moderateMutation = useMutation({
    mutationFn: async ({ id, status, comment }: { id: string; status: "approved" | "rejected"; comment: string }) => {
      await apiRequest("PATCH", `/api/contributions/${id}`, {
        status,
        reviewerComment: comment,
        reviewedBy: user?.id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contributions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/tracks"] });
      setSelectedContribution(null);
      setReviewComment("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to moderate contribution",
        variant: "destructive",
      });
    },
  });

  const handleApprove = (id: string) => {
    moderateMutation.mutate(
      { id, status: "approved", comment: reviewComment },
      {
        onSuccess: () => {
          toast({
            title: "Contribution Approved",
            description: "The contribution has been approved and is now live.",
          });
        },
      }
    );
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

    moderateMutation.mutate(
      { id, status: "rejected", comment: reviewComment },
      {
        onSuccess: () => {
          toast({
            title: "Contribution Rejected",
            description: "The contributor has been notified.",
          });
        },
      }
    );
  };

  const pendingContributions = contributions.filter(c => c.status === "pending");
  const reviewedContributions = contributions.filter(c => c.status !== "pending");

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Review and manage community contributions
          </p>
        </div>
        <CreateLessonDialog 
          trigger={
            <Button size="lg" data-testid="button-create-new-lesson">
              <BookPlus className="mr-2 h-5 w-5" />
              Create New Lesson
            </Button>
          }
        />
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
                {contributions.filter(c => c.status === "approved").length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Contributors</p>
              <p className="text-2xl font-bold" data-testid="stat-contributors">
                {new Set(contributions.map(c => c.contributorId)).size}
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
                      Submitted {new Date(contribution.createdAt).toLocaleDateString()}
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
                        {contribution.data.difficulty}
                      </Badge>
                      <Badge variant="outline">
                        {contribution.data.questions?.length || 0} questions
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {contribution.type === "lesson" && (
                    <EditContributionDialog 
                      contribution={contribution}
                      onSuccess={() => {
                        toast({
                          title: "Success",
                          description: "Contribution updated successfully",
                        });
                      }}
                    />
                  )}
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
                </div>
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
    </motion.div>
  );
}
