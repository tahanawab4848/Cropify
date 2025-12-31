import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
	const { toast } = useToast();
	const { login, me } = useAuth();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState<"admin" | "farmer">("farmer");

	const onSubmit = async () => {
		if (!username || !password) {
			toast({ title: "Missing fields", description: "Enter username and password" });
			return;
		}
		await login.mutateAsync({ username, password, role });
		toast({ title: "Logged in", description: `Welcome ${username} (${role})` });
	};

	return (
		<div className="min-h-screen bg-background">
			<Navigation />
			<div className="container mx-auto px-6 py-12 max-w-md">
				<Card>
					<CardHeader>
						<h1 className="text-2xl font-bold">Sign in</h1>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="username">Username</Label>
							<Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
						</div>
						<div className="space-y-2">
							<Label>Role</Label>
							<div className="flex gap-3">
								<label className="flex items-center gap-2 text-sm">
									<input type="radio" name="role" checked={role === "farmer"} onChange={() => setRole("farmer")} />
									<span>Farmer</span>
								</label>
								<label className="flex items-center gap-2 text-sm">
									<input type="radio" name="role" checked={role === "admin"} onChange={() => setRole("admin")} />
									<span>Admin</span>
								</label>
							</div>
						</div>
						<Button className="w-full" onClick={onSubmit} disabled={login.isPending}>Sign in</Button>
						{me && (
							<p className="text-sm text-muted-foreground mt-2">Currently signed in as {me.username} ({me.role})</p>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}


